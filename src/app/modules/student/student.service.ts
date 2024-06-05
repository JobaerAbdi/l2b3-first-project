import mongoose from 'mongoose'
import { TStudent } from './student.interface'
import { Student } from './student.model'
import { User } from '../user/user.model'

// const createStudentIntoDB = async (payload: TStudent) => {

//   //................................................................

//   // build in static methods //
//   const data = await Student.create(payload)
//   return data

//   //................................................................

//   // build in instance methods //
//   // const student = new Student(payload)
//   // const result = await student.save()
//   // return result

//   //................................................................

//   // custom instance methods //
//   // const student = new Student(payload)
//   // const result = await student.isUserExists(payload.id)
//   // // console.log("instance result=>",result);
//   // if(result) {
//   //   throw new Error('User already exists!')
//   // }

//   //................................................................

//   // custom static methods //
//   // const result = await Student.isUserExists(payload.id)
//   // if(result){
//   //   throw new Error("User already existssssssssssssssssss!")
//   // }

// };

// ========================================================================

const getAllStudentsFromDB = async (query: Record<string,unknown>) => {
  console.log("Base query=>", query);
  const queryObj = {...query}
  console.log("Copy queryObj=>", queryObj);
  const studentSearchableFields = ["email", "name.firstName", "presentAddress"]
  let searchTerm = '';
  if(query?.searchTerm){
    searchTerm = query?.searchTerm as string
  }
  const searchQuery = Student.find({
    $or: studentSearchableFields.map((field)=>({
      [field]: {$regex: searchTerm, $options: "i"}
    }))
  })

  // Filtering
  const excludeFields = ["searchTerm", "sort", "limit", "page", "fields"]
  excludeFields.forEach(element=> delete queryObj[element])
  console.log("After delete copy query in queryObj=>", queryObj);
  

  const filterQuery= searchQuery.find(queryObj)  // chining searchQuery
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment', 
      populate: {
        path: 'academicFaculty',
      },
    })

    let sort = "-createdAt"
    if(query?.sort){
      sort = String(query.sort) 
    }

    const sortQuery = filterQuery.sort(sort)

    let page = 1
    let limit = 1
    let skip = 0

    if(query?.limit){
      limit = Number(query.limit)
    }

    if(query?.page){
      page = Number(query.page)
      skip =  (page - 1) * limit     
    }
    const paginateQuery = sortQuery.skip(skip)
    const limitQuery = paginateQuery.limit(limit)

    let fields = '-__v'
    if(query?.fields){
      fields = (query.fields as string).split(',').join(' ')
      console.log("From fields after split and join=>", fields);
    }

    const fieldQuery = await limitQuery.select(fields)
    return fieldQuery
}

// ========================================================================

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findById(id)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
  console.log(result)
  return result
}

// ========================================================================

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>)=>{
  const { name, guardian, localGuardian, ...remainingStudentData } = payload

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData
  }

  if(name && Object.keys(name).length){
    for(const [key,value] of Object.entries(name)){
      modifiedUpdatedData[`name.${key}`] = value
    }
  }

  if(guardian && Object.keys(guardian).length){
    for(const [key, value] of Object.entries(guardian)){
      modifiedUpdatedData[`guardian.${key}`] = value
    }
  }

  if(localGuardian && Object.keys(localGuardian).length){
    for(const [key, value] of Object.entries(localGuardian)){
      modifiedUpdatedData[`localGuardian.${key}`] = value
    }
  }

  
  console.log(modifiedUpdatedData);
  
  const result = await Student.findOneAndUpdate(
    {id},
    modifiedUpdatedData,
    {new: true, runValidators: true}
  )
  return result
}

// ========================================================================

const deleteStudentIntoDB = async (id: string) => {
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const deletedStudent = await Student.findOneAndUpdate(   // => findOneAndUpdate use because this is custom made generate id.
      { id },
      { isDeleted: true },
      {new: true, session}
    )
    if(!deletedStudent){
      throw new Error("Failed to deleted student!")
    }
    const deletedUser = await User.findOneAndUpdate(  // => findOneAndUpdate use because this is custom made generate id.
      {id},
      {isDeleted: true},
      {new: true, session}
    )
    if(!deletedUser){
      throw new Error("Failed to deleted user!")
    }
    await session.commitTransaction()
    await session.endSession()
    return deletedStudent
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

// const deleteStudentIntoDB = async (id: string) => {
//   const session = await mongoose.startSession()
//   try {
//     session.startTransaction()
//     const deletedStudent = await Student.findByIdAndUpdate( // => For mongodb id
//       { id },
//       { isDeleted: true },
//       {new: true, session}
//     )
//     if(!deletedStudent){
//       throw new Error("Failed to deleted student!")
//     }
//     const deletedUser = await User.findByIdAndUpdate( // => For mongodb id
//       {id},
//       {isDeleted: true},
//       {new: true, session}
//     )
//     if(!deletedUser){
//       throw new Error("Failed to deleted user!")
//     }
//     await session.commitTransaction()
//     await session.endSession()
//     return deletedStudent
//   } catch (err) {
//     await session.abortTransaction()
//     await session.endSession()
//     throw new Error("Failed to deleted student and user!")
//   }
// }

// ========================================================================

export const StudentServices = {
  // createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentIntoDB,
  deleteStudentIntoDB,
}

import mongoose from 'mongoose'
import QueryBuilder from '../../builder/QueryBuilder'
import { FacultySearchableFields } from './faculty.constant'
import { TFaculty } from './faculty.interface'
import { Faculty } from './faculty.model'
import { User } from '../user/user.model'

// ---------------------------------------------------------------------------------------------------

const getAllFacultiesFromDB = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(
    Faculty.find().populate('academicDepartment'),
    query,
  )
    .search(FacultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await facultyQuery.modelQuery
  return result
}

// ---------------------------------------------------------------------------------------------------

const getSingleFacultyFromDB = async(id: string)=>{
  const result = await Faculty.findById(id).populate("academicDepartment")
  return result
}

// ---------------------------------------------------------------------------------------------------

const updateFacultyIntoDB = async(id: string, payload: Partial<TFaculty>)=>{
  const {name, ...remainingFacultyData} = payload
  
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingFacultyData
  }

  if(name && Object.keys(name).length){
    for(const [key, value] of Object.entries(name)){
      modifiedUpdatedData[`name.${key}`] = value
    }
  }

  const result = await Faculty.findByIdAndUpdate(
    id,
    modifiedUpdatedData,
    {new: true, runValidators: true}
  )
  return result
}

// ---------------------------------------------------------------------------------------------------

const deleteFacultyFromDB = async(id: string)=> {
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const deleteFaculty = await Faculty.findByIdAndUpdate(
      id,
      {isDeleted: true},
      {new: true, session}
    )
    console.log(deleteFaculty);
    if(!deleteFaculty){
      throw new Error("Failed to delete faculty!")
    }
    // get user _id from deleteFaculty
    const userId = deleteFaculty.user
    const deleteUser = await User.findByIdAndUpdate(
      userId,
      {isDeleted: true},
      {new: true, session}
    )
    if(!deleteUser){
      throw new Error("Failed to delete user!")
    }
    await session.commitTransaction()
    await session.endSession()
    return deleteFaculty
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

export const FacultyServices = {
  getAllFacultiesFromDB,
  getSingleFacultyFromDB,
  updateFacultyIntoDB,
  deleteFacultyFromDB,
}

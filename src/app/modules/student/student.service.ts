import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (payload: TStudent) => {

  //................................................................

  // build in static methods //
  const data = await Student.create(payload)
  return data

  //................................................................

  // build in instance methods //
  // const student = new Student(payload)
  // const result = await student.save()
  // return result

  //................................................................

  // custom instance methods //
  // const student = new Student(payload)
  // const result = await student.isUserExists(payload.id)
  // // console.log("instance result=>",result);
  // if(result) {
  //   throw new Error('User already exists!')
  // }

  //................................................................

  // custom static methods //
  // const result = await Student.isUserExists(payload.id)
  // if(result){
  //   throw new Error("User already existssssssssssssssssss!")
  // }
  
};

// ========================================================================

const getAllStudentsFromDB = async () => {
  const result = await Student.find() 
  return result
};

// ========================================================================


const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
  console.log(result)
  return result
};

// ========================================================================


const deleteStudentIntoDB = async (id: string) => {
  const result = await Student.updateOne(
    { id },
    { isDeleted: true },
    // { new: true, runValidators: true },
  )
  return deleteStudentIntoDB
};

// ========================================================================


export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentIntoDB,
};

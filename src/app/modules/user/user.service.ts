import mongoose from 'mongoose'
import config from '../../config'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.model'
import { TUser } from './user.interface'
import { User } from './user.model'
import { TFaculty } from '../faculty/faculty.interface'
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model'
import { generateFacultyId, generateStudentId } from './user.utils'
import { Faculty } from '../faculty/faculty.model'

const createStudentIntoDB = async (payload: TStudent, password: string) => {
  const userData: Partial<TUser> = {}
  userData.password = password || (config.default_password as string)
  userData.role = 'student'

  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  )

  if(!admissionSemester){
    throw new Error("Admission semester not found!")
  }

  const session = await mongoose.startSession() //=> start session
  try {
    session.startTransaction() // start transaction
    userData.id = await generateStudentId(admissionSemester)

    const newUser = await User.create([userData], {session}) //=> session set in User model
    if (!newUser.length) {
      throw new Error('Failed to create user');
    }
      payload.id = newUser[0].id
      payload.user = newUser[0]._id // Reference id

      const newStudent = await Student.create([payload], {session}) //=> session set in Student model
      if (!newStudent.length) {
        throw new Error('Failed to create student');
      }
      await session.commitTransaction() //=> session.commitTransaction
      await session.endSession() //=> session.endSession
      return newStudent
    
  } catch (err: any) {
     await session.abortTransaction() //=> session.abortTransaction
     await session.endSession() //=> session.endSession
     throw new Error(err);
  }
}

//=========================================================================================

const createFacultyIntoDB = async(payload: TFaculty, password: string)=>{
  const userData: Partial<TUser> = {}
  userData.password = password || (config.default_password as string)
  userData.role = "faculty"

  const academicDepartment = await AcademicDepartment.findById(payload.academicDepartment)
  if(!academicDepartment){
    throw new Error("Academic department not found!")
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction()
    userData.id = await generateFacultyId(academicDepartment)
    const newUser = await User.create([userData], {session}) //=> session set in User model
    if (!newUser.length) {
      throw new Error('Failed to create user');
    }
      payload.id = newUser[0].id
      payload.user = newUser[0]._id // Reference id
      const newFaculty = await Faculty.create([payload], {session}) //=> session set in Student model
      if (!newFaculty.length) {
        throw new Error('Failed to create faculty');
      }
      await session.commitTransaction() 
      await session.endSession() 
      return newFaculty
  } catch (err: any) {
     await session.abortTransaction()
     await session.endSession()
     throw new Error(err)
  }
}

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB
}



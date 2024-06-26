import mongoose from 'mongoose'
import config from '../../config'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.model'
import { TUser } from './user.interface'
import { User } from './user.model'
import { TFaculty } from '../faculty/faculty.interface'
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model'
import { generateAdminId, generateFacultyId, generateStudentId } from './user.utils'
import { Faculty } from '../faculty/faculty.model'
import { TAdmin } from '../admin/admin.interface'
import { Admin } from '../admin/admin.model'

//=========================================================================================

const createStudentIntoDB = async (payload: TStudent, password: string) => {
  const userData: Partial<TUser> = {}
  userData.password = password || (config.default_password as string)
  userData.role = 'student'

  // findById diea search korle all information diea dea.
  // payload.admissionSemester mane current academicSemester er _id.
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  )
  // console.log(admissionSemester);

  if (!admissionSemester) {
    throw new Error('Admission semester not found!')
  }

  const session = await mongoose.startSession() //=> start session
  try {
    session.startTransaction() // start transaction
    userData.id = await generateStudentId(admissionSemester)
    // console.log("User data=>" ,userData);
    // User data=> { password: 'dgrtgr476353', role: 'student', id: '2030020011' }
    const newUser = await User.create([userData], { session }) //=> session set in User model
    // User data=> [{ password: 'dgrtgr476353', role: 'student', id: '2030020011' }]
    if (!newUser.length) {
      throw new Error('Failed to create user')
    }
    payload.id = newUser[0].id
    payload.user = newUser[0]._id // Reference id

    const newStudent = await Student.create([payload], { session }) //=> session set in Student model
    // console.log(newStudent);

    if (!newStudent.length) {
      throw new Error('Failed to create student')
    }
    await session.commitTransaction() //=> session.commitTransaction
    await session.endSession() //=> session.endSession
    return newStudent
  } catch (err: any) {
    await session.abortTransaction() //=> session.abortTransaction
    await session.endSession() //=> session.endSession
    throw new Error(err)
  }
}

//=========================================================================================

const createFacultyIntoDB = async (payload: TFaculty, password: string) => {
  const userData: Partial<TUser> = {}
  userData.password = password || (config.default_password as string)
  userData.role = 'faculty'
  // This is current academic department
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  )
  console.log(academicDepartment)
  if (!academicDepartment) {
    throw new Error('Academic department not found!')
  }

  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    userData.id = await generateFacultyId(academicDepartment)
    const newUser = await User.create([userData], { session }) //=> session set in User model
    if (!newUser.length) {
      throw new Error('Failed to create user')
    }
    payload.id = newUser[0].id
    payload.user = newUser[0]._id // Reference id
    const newFaculty = await Faculty.create([payload], { session }) //=> session set in Student model
    if (!newFaculty.length) {
      throw new Error('Failed to create faculty')
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

//=========================================================================================

const createAdminIntoDB = async (payload: TAdmin, password: string) => {
  const userData: Partial<TUser> = {}
  userData.password = password || (config.default_password as string)
  userData.role = 'admin'

  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    userData.id = await generateAdminId()
    const newUser = await User.create([userData], { session })
    if (!newUser) {
      throw new Error('Failed to create user!')
    }

    payload.id = newUser[0].id
    payload.user = newUser[0]._id

    const newAdmin = await Admin.create([payload], { session })
    if (!newAdmin) {
      throw new Error('Failed to create admin!')
    }
    await session.commitTransaction()
    await session.endSession()
    return newAdmin
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
}

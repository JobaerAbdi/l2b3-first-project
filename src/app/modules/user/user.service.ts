import config from '../../config'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.model'
import { TUser } from './user.interface'
import { User } from './user.model'
import generateStudentId from './user.utils'

const createStudentIntoDB = async (payload: TStudent, password: string) => {
  const userData: Partial<TUser> = {}
  userData.password = password || config.default_password as string
  userData.role = "student"

  const admissionSemester = await AcademicSemester.findById(payload.admissionSemester)
  userData.id = await generateStudentId(admissionSemester)

  const newUser = await User.create(userData)
  if(Object.keys(newUser).length){
    payload.id = newUser.id
    payload.user = newUser._id  // Reference id
    const newStudent = await Student.create(payload)
    return newStudent
  }
}

// const createAdminIntoDB = async (payload: TUser) => {
//   const result = await User.create(payload)
//   return result
// }

export const UserServices = {
  createStudentIntoDB,
  // createAdminIntoDB
}


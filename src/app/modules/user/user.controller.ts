// import userValidationSchema from './user.validation'
import { RequestHandler } from 'express'
import { UserServices } from './user.service'
// =======================================================================================

const createStudent: RequestHandler = async (req, res, next) => {
  try {
    const { studentData, password } = req.body
    const result = await UserServices.createStudentIntoDB(studentData, password)
    res.status(200).json({
      success: true,
      message: 'User is created successfully!',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

// =======================================================================================

const createFaculty: RequestHandler = async (req, res, next) => {
  try {
    const { facultyData, password } = req.body
    const result = await UserServices.createFacultyIntoDB(facultyData, password)
    res.status(200).json({
      success: true,
      message: 'Faculty is created successfully!',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

// =======================================================================================

const createAdmin: RequestHandler = async (req, res, next) => {
  try {
    const {adminData, password} = req.body
    const result = await UserServices.createAdminIntoDB(adminData, password)
    res.status(200).json({
      success: true,
      message: "Admin is created successfully!",
      data: result
    })
  } catch (err) {
    next(err)
  }
}

export const UserControllers = {
  createStudent,
  createFaculty,
  createAdmin,
}

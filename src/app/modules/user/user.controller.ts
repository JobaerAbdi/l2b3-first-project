// import userValidationSchema from './user.validation'
import { RequestHandler } from 'express'
import { UserServices } from './user.service'

const createStudent: RequestHandler = async (req, res, next) => {
  try {
    const {studentData, password} = req.body
    const result = await UserServices.createStudentIntoDB(studentData, password)
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

export const UserControllers = {
  createStudent,
}

import { Request, Response } from 'express'
// import userValidationSchema from './user.validation'
import { UserServices } from './user.service'

const createStudent = async (req: Request, res: Response) => {
  try {
    const {studentData, password} = req.body
    // const zodParseData = userValidationSchema.parse(student)
    const result = await UserServices.createStudentIntoDB(studentData, password)
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
    })
  }
}

export const UserControllers = {
  createStudent,
}

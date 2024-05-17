import { Request, Response } from 'express'
import { StudentServices } from './student.service'

const createStudentIntoDB = async (req: Request, res: Response) => {
  try {
    const { student } = req.body
    const result = await StudentServices.createStudentIntoDB(student)
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    })
  } catch (err) {
    console.log(err)
  }
}

const getAllStudents = async(req: Request, res: Response)=>{
  try {
    const result = await StudentServices.getAllStudentsFromDB()
    res.status(200).json({
      success: true,
      message: 'Students are retrieved successfully',
      data: result,
    })
  } catch (err) {
    console.log(err)
  }
}

const getSingleStudent = async(req: Request, res: Response)=>{
  try {
    const {studentId} = req.params
    const result = await StudentServices.getSingleStudentFromDB(studentId)
    res.status(200).json({
      success: true,
      message: 'Student is retrieved successfully',
      data: result,
    })
  } catch (err) {
    console.log(err)
  }
}

export const StudentControllers = {
  createStudentIntoDB,
  getAllStudents,
  getSingleStudent
}

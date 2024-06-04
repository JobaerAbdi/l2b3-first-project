import { NextFunction, Request, Response } from 'express'
import { StudentServices } from './student.service'
// import studentValidationSchema from './student.validation'

// const createStudentIntoDB = async (req: Request, res: Response) => {
//   try {
//     const { student } = req.body
//     const zodParseData = studentValidationSchema.parse(student)
//     // console.log("zodParseData =>",zodParseData);

//     const result = await StudentServices.createStudentIntoDB(zodParseData)
//     // console.log("Service return=>",result);

//     res.status(200).json({
//       success: true,
//       message: 'Student is created successfully',
//       data: result,
//     })
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: err.message || 'Something went wrong',
//       error: err,
//     })
//   }
// }

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const query = req.query
    console.log("Controller query=>", query);
    const result = await StudentServices.getAllStudentsFromDB(query)
    res.status(200).json({
      success: true,
      message: 'All students are retrieved successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params
    const result = await StudentServices.getSingleStudentFromDB(studentId)
    res.status(200).json({
      success: true,
      message: 'Student is retrieved successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

const updateStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params
    const { studentData } = req.body
    const result = await StudentServices.updateStudentIntoDB(studentId, studentData)
    res.status(200).json({
      success: true,
      message: 'Student is updated successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

const deleteStudent = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const { studentId } = req.params
    const result = await StudentServices.deleteStudentIntoDB(studentId)
    res.status(200).json({
      success: true,
      message: 'Student and user is deleted successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

export const StudentControllers = {
  // createStudentIntoDB,
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
}

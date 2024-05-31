import { RequestHandler } from 'express'
import { AcademicSemesterServices } from './academicSemester.service'

const createAcademicSemester: RequestHandler = async (req, res, next) => {
  try {
    const { academicSemesterData } = req.body
    const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(academicSemesterData)
    res.status(200).json({
        success: true,
        message: "Academic semester created successfully",
        data: result
    })
  } catch (err) {
    next(err)
  }
}

export const AcademicSemesterControllers = {
    createAcademicSemester
}
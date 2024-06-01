import { RequestHandler } from 'express'
import { AcademicFaultyServices } from './academicFaculty.service'

const createAcademicFaculty: RequestHandler = async (req, res, next) => {
  try {
    const { academicFaultyData } = req.body
    const result =
      await AcademicFaultyServices.createAcademicFacultyIntoDB(
        academicFaultyData,
      )
    res.status(200).json({
      success: true,
      message: 'Academic faculty created successfully!',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}
export const AcademicFacultyControllers = {
    createAcademicFaculty,
}
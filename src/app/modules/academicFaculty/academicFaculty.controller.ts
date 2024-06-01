import { RequestHandler } from 'express'
import { AcademicFaultyServices } from './academicFaculty.service'

const createAcademicFaculty: RequestHandler = async (req, res, next) => {
  try {
    const { academicFaculty } = req.body
    const result =
      await AcademicFaultyServices.createAcademicFacultyIntoDB(
        academicFaculty,
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
const getAllAcademicFaculty: RequestHandler = async (req, res, next) => {
  try {
    const result = await AcademicFaultyServices.getAllAcademicFacultyFromDB()
    res.status(200).json({
      success: true,
      message: 'All academic faculties are retrieved successfully!',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}
const getSingleAcademicFaculty: RequestHandler = async (req, res, next) => {
  try {
    const { facultyId } = req.params
    const result =
      await AcademicFaultyServices.getSingleFacultyFromDB(facultyId)
    res.status(200).json({
      success: true,
      message: 'Single academic faculty is retrieved successfully!',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}
const updateAcademicFaculty: RequestHandler = async (req, res, next) => {
  try {
    const { facultyId } = req.params
    const { academicFaculty } = req.body
    const result =
      await AcademicFaultyServices.updateFacultyIntoDb(facultyId, academicFaculty)
    res.status(200).json({
      success: true,
      message: 'Academic faculty update successfully!',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}
export const AcademicFacultyControllers = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty
}

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

const getAllAcademicSemester: RequestHandler = async (req, res, next) => {
  try {
    const result = await AcademicSemesterServices.getAllAcademicSemesterFromDB()
    res.status(200).json({
        success: true,
        message: "All academic semesters are retrieved successfully!",
        data: result
    })
  } catch (err) {
    next(err)
  }
}

const getSingleAcademicSemester: RequestHandler = async (req, res, next) => {
  try {
    const {semesterId} = req.params
    const result = await AcademicSemesterServices.getSingleAcademicSemesterFromDB(semesterId)
    res.status(200).json({
        success: true,
        message: "Academic semester is retrieved successfully!",
        data: result
    })
  } catch (err) {
    next(err)
  }
}

export const AcademicSemesterControllers = {
    createAcademicSemester,
    getAllAcademicSemester,
    getSingleAcademicSemester
}
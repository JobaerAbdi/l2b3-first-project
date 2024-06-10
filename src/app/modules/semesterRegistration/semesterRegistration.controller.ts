import { RequestHandler } from 'express'
import { SemesterRegistrationService } from './semesterRegistration.service'

// =========================================================================================

const createSemesterRegistration: RequestHandler = async (req, res, next) => {
  try {
    const semesterData = req.body
    const result =
      await SemesterRegistrationService.createSemesterRegistrationIntoDB(semesterData)
    res.status(200).json({
      success: true,
      message: 'Semester Registration is created successfully!',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

// =========================================================================================

const getAllSemesterRegistrations: RequestHandler = async (req, res, next) => {
  try {
    const query = req.query
    const result =
      await SemesterRegistrationService.getAllSemesterRegistrationsFromDB(query)
    res.status(200).json({
      success: true,
      message: 'Semester Registration is retrieved successfully !',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

// =========================================================================================


const getSingleSemesterRegistration: RequestHandler = async (req, res, next) => {
  try {
    const {id} = req.params
    const result =
      await SemesterRegistrationService.getSingleSemesterRegistrationsFromDB(id)
    res.status(200).json({
      success: true,
      message: 'Semester Registration is retrieved successfully !',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

// =========================================================================================

const updateSemesterRegistration: RequestHandler = async (req, res, next) => {
  try {
    const {id} = req.params
    const semesterData = req.body
    const result =
      await SemesterRegistrationService.updateSemesterRegistrationIntoDB(id, semesterData)
    res.status(200).json({
      success: true,
      message: 'Semester Registration is updated successfully !',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

// =========================================================================================

const deleteSemesterRegistration: RequestHandler = async (req, res, next) => {
  try {
    const {id} = req.params
    const result =
      await SemesterRegistrationService.deleteSemesterRegistrationFromDB(id)
    res.status(200).json({
      success: true,
      message: 'Semester Registration is updated successfully !',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

// =========================================================================================

export const SemesterRegistrationController = {
  createSemesterRegistration,
  getAllSemesterRegistrations,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
  deleteSemesterRegistration,
}

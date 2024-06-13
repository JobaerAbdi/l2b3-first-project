import { RequestHandler } from 'express'
import { Faculty } from './faculty.model'
import { FacultyServices } from './faculty.service'

const getAllFaculties: RequestHandler = async (req, res, next) => {
  try {
    console.log("test=>", req.user);
    
    const query = req.query
    const result = await FacultyServices.getAllFacultiesFromDB(query)
    res.status(200).json({
      success: true,
      message: 'Faculties are retrieved successfully!',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

//---------------------------------------------------------------------------------------------

const getSingleFaculty : RequestHandler = async (req, res, next) => {
  try {
    const {id} = req.params
    const result = await FacultyServices.getSingleFacultyFromDB(id)
    res.status(200).json({
      success: true,
      message: 'Single faculty is retrieved successfully!',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

//---------------------------------------------------------------------------------------------

const updateFaculty: RequestHandler = async (req, res, next) => {
  try {
    const {id} = req.params
    const {facultyData} = req.body
    const result = await FacultyServices.updateFacultyIntoDB(id, facultyData)
    res.status(200).json({
      success: true,
      message: 'Faculty is updated successfully!',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

//---------------------------------------------------------------------------------------------

const deleteFaculty: RequestHandler = async (req, res, next) => {
  try {
    const {id} = req.params
    const result = await FacultyServices.deleteFacultyFromDB(id)
    res.status(200).json({
      success: true,
      message: 'Faculty is deleted successfully!',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

export const FacultyControllers = {
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
}

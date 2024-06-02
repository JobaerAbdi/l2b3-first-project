import { RequestHandler } from "express";
import { AcademicDepartmentServices } from "./academicDepartment.service";

const createAcademicDepartment: RequestHandler = async(req, res, next)=>{
    try {
        const {academicDepartment} = req.body
        const result = await AcademicDepartmentServices.createAcademicDepartmentIntoDB(academicDepartment)
        res.status(200).json({
            success: true,
            message: "Academic department created successfully!",
            data: result
        })
    } catch (err) {
        next(err)
    }
}

const getAllAcademicDepartment: RequestHandler = async(req, res, next)=>{
    try {
        const result = await AcademicDepartmentServices.getAllAcademicDepartmentFromDB()
        res.status(200).json({
            success: true,
            message: "All academic department retrieved successfully!",
            data: result
        })
    } catch (err) {
        next(err)
    }
}

const getSingleAcademicDepartment: RequestHandler = async(req, res, next)=>{
    try {
        const {departmentId} = req.params
        const result = await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(departmentId)
        res.status(200).json({
            success: true,
            message: "Get single academic department retrieved successfully!",
            data: result
        })
    } catch (err) {
        next(err)
    }
}
const updateAcademicDepartment: RequestHandler = async(req, res, next)=>{
    try {
        const {departmentId} = req.params
        const {academicDepartment} = req.body
        const result = await AcademicDepartmentServices.updateAcademicDepartmentFromDB(departmentId, academicDepartment)
        res.status(200).json({
            success: true,
            message: "Update academic department successfully!",
            data: result
        })
    } catch (err) {
        next(err)
    }
}

export const academicDepartmentControllers = {
    createAcademicDepartment,
    getAllAcademicDepartment,
    getSingleAcademicDepartment,
    updateAcademicDepartment
}
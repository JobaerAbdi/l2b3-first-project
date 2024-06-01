import express from "express"
import { AcademicFacultyControllers } from "./academicFaculty.controller"
import validationRequest from "../../middlewares/validateRequest"
import { academicFacultyValidation } from "./academicFaculty.validation"
const router = express.Router()
router.post("/create-academic-faculty",
validationRequest(academicFacultyValidation.createAcademicFaultyValidationSchema),
AcademicFacultyControllers.createAcademicFaculty )


export const AcademicFacultyRoutes = router
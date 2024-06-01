import express from "express"
import { AcademicFacultyControllers } from "./academicFaculty.controller"
import validationRequest from "../../middlewares/validateRequest"
import { academicFacultyValidation } from "./academicFaculty.validation"
const router = express.Router()

router.post("/create-academic-faculty",
validationRequest(academicFacultyValidation.createAcademicFaultyValidationSchema),
AcademicFacultyControllers.createAcademicFaculty )

router.get("/", AcademicFacultyControllers.getAllAcademicFaculty)

router.get("/:facultyId", AcademicFacultyControllers.getSingleAcademicFaculty)

router.patch("/:facultyId",
validationRequest(academicFacultyValidation.updateAcademicFaultyValidationSchema),
AcademicFacultyControllers.updateAcademicFaculty)


export const AcademicFacultyRoutes = router
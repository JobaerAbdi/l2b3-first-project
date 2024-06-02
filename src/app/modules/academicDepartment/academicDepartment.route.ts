import express from "express"
import validationRequest from "../../middlewares/validateRequest"
import { academicDepartmentValidation } from "./academicDepartment.validation"
import { academicDepartmentControllers } from "./academicDepartment.controller"
const router = express.Router()

router.post("/create-academic-department",
validationRequest(academicDepartmentValidation.createAcademicDepartmentValidationSchema), 
academicDepartmentControllers.createAcademicDepartment)

router.get("/", academicDepartmentControllers.getAllAcademicDepartment)

router.get("/:departmentId", academicDepartmentControllers.getSingleAcademicDepartment)

router.patch("/:departmentId",
validationRequest(academicDepartmentValidation.updateAcademicDepartmentValidationSchema),
academicDepartmentControllers.updateAcademicDepartment)


export const AcademicDepartmentRoutes = router
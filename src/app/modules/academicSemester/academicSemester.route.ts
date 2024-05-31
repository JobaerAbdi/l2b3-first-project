import express from 'express'
import validationRequest from '../../middlewares/validateRequest'
import { academicSemesterSchema } from './academicSemester.validation'
import { AcademicSemesterControllers } from './academicSemester.controller'
const router = express.Router()

router.post(
  '/create-academic-semester',
  validationRequest(academicSemesterSchema.createAcademicSemesterSchema),
  AcademicSemesterControllers.createAcademicSemester,
)

router.get("/", AcademicSemesterControllers.getAllAcademicSemester)

router.get("/:semesterId", AcademicSemesterControllers.getSingleAcademicSemester)

export const AcademicSemesterRoutes = router

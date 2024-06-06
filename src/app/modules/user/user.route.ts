import express from 'express'
import { UserControllers } from './user.controller'
import { studentValidationSchemas } from '../student/student.validation'
import validationRequest from '../../middlewares/validateRequest'
import { facultyValidations } from '../faculty/faculty.validation'
const router = express.Router()

router.post(
  "/create-student",
  validationRequest(studentValidationSchemas.createStudentValidationSchema),
  UserControllers.createStudent,
)

router.post(
  "/create-faculty",
  validationRequest(facultyValidations.createFacultyValidationSchema),
  UserControllers.createFaculty
)

export const UserRoutes = router

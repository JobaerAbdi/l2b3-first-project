import express from 'express'
import { UserControllers } from './user.controller'
import { studentValidationSchemas } from '../student/student.validation'
import validationRequest from '../../middlewares/validateRequest'
const router = express.Router()

router.post(
  '/create-student',
  validationRequest(studentValidationSchemas.createStudentValidationSchema),
  UserControllers.createStudent,
)
// router.post('/create-admin', UserControllers)
// router.post('/create-faculty', UserControllers)

export const UserRoutes = router

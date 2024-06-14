import express from 'express'
import { UserControllers } from './user.controller'
import { studentValidationSchemas } from '../student/student.validation'
import validationRequest from '../../middlewares/validateRequest'
import { facultyValidations } from '../faculty/faculty.validation'
import { AdminValidations } from '../admin/admin.validation'
import auth from '../../middlewares/auth'
import { USER_ROLE } from './user.constant'
const router = express.Router()

// Create student
router.post(
  "/create-student",
  // auth(USER_ROLE.admin),
  validationRequest(studentValidationSchemas.createStudentValidationSchema),
  UserControllers.createStudent,
)


// Create faculty
router.post(
  "/create-faculty",
  // auth(USER_ROLE.admin),
  validationRequest(facultyValidations.createFacultyValidationSchema),
  UserControllers.createFaculty
)

// Create admin
router.post(
  "/create-admin",
  // auth(USER_ROLE.admin),
  validationRequest(AdminValidations.createAdminValidationSchema),
  UserControllers.createAdmin
)

export const UserRoutes = router

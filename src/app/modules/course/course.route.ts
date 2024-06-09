import express from 'express'
import { courseControllers } from './course.controller'
import validationRequest from '../../middlewares/validateRequest'
import { courseValidations } from './course.validation'

const router = express.Router()

router.post(
  '/create-course',
  validationRequest(courseValidations.createCourseValidationSchema),
  courseControllers.createCourse,
)

router.get('/', courseControllers.getAllCourse)

router.get('/:id', courseControllers.getSingleCourse)

router.patch('/:id',
  validationRequest(courseValidations.updateCourseValidationSchema),
  courseControllers.updateCourse
)

router.delete('/:id', courseControllers.deleteCourse)

export const CourseRoutes = router

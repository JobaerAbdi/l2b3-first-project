import express from 'express';
import { OfferedCourseControllers } from './offeredCourse.controller';
import { OfferedCourseValidations } from './offeredCourse.validation';
import validationRequest from '../../middlewares/validateRequest';

const router = express.Router();


router.post(
  '/create-offered-course',
  validationRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedCourseControllers.createOfferedCourse,
  );
  
router.get('/', OfferedCourseControllers.getAllOfferedCourses);
  
router.get('/:id', OfferedCourseControllers.getSingleOfferedCourses);
/*
router.patch(
  '/:id',
  validationRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  OfferedCourseControllers.updateOfferedCourse,
);

router.delete(
  '/:id',
  OfferedCourseControllers.deleteOfferedCourseFromDB,
);
*/
export const offeredCourseRoutes = router;
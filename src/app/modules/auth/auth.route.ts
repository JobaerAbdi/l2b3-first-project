import express from 'express';
import validationRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthControllers } from './auth.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

/*
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from './../user/user.constant';
import { AuthControllers } from './auth.controller';
import { AuthValidation } from './auth.validation';
*/

const router = express.Router();

router.post(
  '/login',
  validationRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
); // (admin login + faculty login + student login)

router.post(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  validationRequest(AuthValidation.changePasswordValidationSchema),
  AuthControllers.changePassword
)


router.post(
  '/refresh-token',
  validationRequest(AuthValidation.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);


export const AuthRoutes = router;
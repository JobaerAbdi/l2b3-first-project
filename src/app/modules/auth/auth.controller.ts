/*
import httpStatus from 'http-status';
import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';
*/

import { RequestHandler } from "express";
import { AuthServices } from "./auth.service";

// ====================================================================================
const loginUser: RequestHandler = async(req, res, next)=>{
 try {
  const logData = req.body
  const result = await AuthServices.loginUser(logData)
  res.status(200).json({
    success: true,
    message: "User is logged in successfully!",
    data: result
  })
 } catch (err) {
   next(err)
 }
}
//......................................................................................
// const loginUser = catchAsync(async (req, res) => {
//   const result = await AuthServices.loginUser(req.body);
//   const { refreshToken, accessToken, needsPasswordChange } = result;

//   res.cookie('refreshToken', refreshToken, {
//     secure: config.NODE_ENV === 'production',
//     httpOnly: true,
//   });

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'User is logged in succesfully!',
//     data: {
//       accessToken,
//       needsPasswordChange,
//     },
//   });
// });

// ====================================================================================

const changePassword: RequestHandler = async(req, res, next)=>{
  try {
    // console.log(req.user);
    /*
    {
      userId: '2030020001',
      role: 'student',
      iat: 1718290422,
      exp: 1719154422
    }
    */
    // console.log(req.body);
    // { oldPassword: 'student123', newPassword: 'student1234' }

    const {...passwordData} = req.body
    const result = await AuthServices.changePassword(req.user, passwordData)
    res.status(200).json({
      success: true,
      message: "Password is update successfully!",
      data: result
    })
   } catch (err) {
     next(err)
   }
}

//..........................................................................

/*
const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;

  const result = await AuthServices.changePassword(req.user, passwordData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password is updated succesfully!',
    data: result,
  });
});
*/

// ====================================================================================

/*
const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token is retrieved succesfully!',
    data: result,
  });
});
*/

// ====================================================================================


export const AuthControllers = {
  loginUser,
  changePassword,
  // refreshToken,
};
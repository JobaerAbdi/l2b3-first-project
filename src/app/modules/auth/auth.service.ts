import { string } from 'zod';
/*
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import { createToken } from './auth.utils';
*/
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import config from '../../config';

// ====================================================================================

const loginUser = async (payload: TLoginUser) => {
  // console.log(payload); // { id: '2030010001', password: 'student123' }
  const isUserExists = await User.findOne({
    id: payload?.id
  })

  // console.log(isUserExists);
  /*
{
  _id: new ObjectId('666a866063d248ee80afbbb0'),
  id: '2030020001',
  password: '$2b$12$EUSM.GsvfhwBBfIe7AzZlOPqcSETFGnIagQ.Zg3U8BkRTtfbQ4/gG',
  needsPasswordChange: true,
  role: 'student',
  status: 'in-progress',
  isDeleted: false,
  createdAt: 2024-06-13T05:40:48.851Z,
  updatedAt: 2024-06-13T05:40:48.851Z,
  __v: 0
}
  */

  if(!isUserExists){
    throw new Error("This user is not found!")
  }

 const isDeleted = isUserExists?.isDeleted //=> false
 // console.log(isDeleted); //=> false
 if(isDeleted){
  throw new Error("This user is deleted!")
 }

 const userStatus = isUserExists?.status //=> in-progress
 // console.log(userStatus); //=> in-progress
 if(userStatus === "blocked"){
  throw new Error("This user is blocked!")
 }

const isPasswordMatched = await bcrypt.compare(payload?.password, isUserExists?.password) 
if(!isPasswordMatched){
  throw new Error("Password does not matched!")
}

const jwtPayload = {
  userId: isUserExists?.id,
  role: isUserExists?.role
}


// create token and send to the client
const accessToken = jwt.sign(
  jwtPayload,
  config.jwt_access_secret as string,
   { expiresIn: '10d' }
  );

  return {
    accessToken,
    needsPasswordChange: isUserExists?.needsPasswordChange
  }
}

// ....................................................................................

/*
const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await User.isUserExistsByCustomId(payload.id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  // checking if the user is blocked

  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  //checking if the password is correct

  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  //create token and sent to the  client

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};
*/

// ====================================================================================
/*
const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  // checking if the user is exist
  const user = await User.isUserExistsByCustomId(userData.userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  // checking if the user is blocked

  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  //checking if the password is correct

  if (!(await User.isPasswordMatched(payload.oldPassword, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );

  return null;
};
*/

// ====================================================================================

const changePassword = async(user: {userId: string, role: string}, payload)=>{
  const result = await User.findOneAndUpdate({
    id: user?.userId,
    role: user?.role
  })
}

//..........................................................................
/*
const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;

  const { userId, iat } = decoded;

  // checking if the user is exist
  const user = await User.isUserExistsByCustomId(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  // checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  if (
    user.passwordChangedAt &&
    User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};
*/

// ====================================================================================

export const AuthServices = {
  loginUser,
  changePassword,
  // refreshToken,
};
// import { Model, Types } from 'mongoose'

// export type TUserName = {
//   firstName: string
//   middleName?: string
//   lastName: string
// }

// export type TGuardian = {
//   fatherName: string
//   fatherOccupation: string
//   fatherContactNo: string
//   motherName: string
//   motherOccupation: string
//   motherContactNo: string
// }

// export type TLocalGuardian = {
//   name: string
//   occupation: string
//   contactNo: string
//   address: string
// }
// // ======================================================

// export type TStudent = {
//   id: string
//   user: Types.ObjectId
//   password: string
//   name: TUserName
//   gender: 'male' | 'female' | 'other'
//   dateOfBirth?: string
//   email: string
//   contactNo: string
//   emergencyContactNo: string
//   bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
//   presentAddress: string
//   permanentAddress: string
//   guardian: TGuardian
//   localGuardian: TLocalGuardian
//   profileImage?: string
//   isDeleted: boolean
// }

// // ===================================================================
// // Custom instance methods //
// // export type StudentCustomInstanceMethods = {
// //     isUserExists(id:string):Promise<TStudent | null>
// // };

// // export type StudentCustomInstanceModel = Model<
// // TStudent,
// // Record<string,never>,
// // StudentCustomInstanceMethods
// // >;
// // ===================================================================

// // Custom static methods //

// export interface StudentCustomStaticModel extends Model<TStudent> {
//   isUserExists(id: string): Promise<TStudent | null>
// }

// =============================================================================
// =============================================================================
// =============================================================================

import { Model, Types } from 'mongoose';

export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TStudent = {
  id: string; // From create backend.
  user: Types.ObjectId; // From create backend.
  password: string;
  name: TUserName;
  gender: 'male' | 'female' | 'other';
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg?: string;
  academicDepartment: Types.ObjectId;
  admissionSemester: Types.ObjectId;
  isDeleted: boolean;
};

//for creating static

export interface StudentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>;
}

// for creating instance

// export interface StudentMethods {
//   isUserExists(id: string): Promise<TStudent | null>;
// }

// export type StudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   StudentMethods
// >;

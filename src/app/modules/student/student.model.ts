import { Schema, model } from 'mongoose'
import { TGuardian, TLocalGuardian, TStudent, TUserName } from './student.interface'

const userNameSchema = new Schema<TUserName>({
    firstName: {
      type: String,
      required: [true, "First name must be required"],
      trim: true,
      maxlength: [20, "First name can not be more than 20 characters"]
    },
    middleName: {
      type: String,
    },
    lastName: {
      type: String,
      required: [true, "Last name must be required"],
    },
  });

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, "Father name must be required"],
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father occupation must be required"],
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father contact no must be required"],
  },
  motherName: {
    type: String,
    required: [true, "Mother name must be required"],
  },
  motherOccupation: {
    type: String,
    required: [true, "Mother occupation must be required"],
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother contact no must be required"],
  },
})

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, "Name must be required"],
  },
  occupation: {
    type: String,
    required: [true, "Occupation must be required"],
  },
  contactNo: {
    type: String,
    required: [true, "Contact no must be required"],
  },
  address: {
    type: String,
    required: [true, "Address must be required"],
  },
});

// =========================================================

const studentSchema = new Schema<TStudent>({
  id: {
    type: String,
    required: [true, "Id must be required"],
    unique: true
  },
  name: {
    type: userNameSchema,
    required: [true, "Name must be required"]
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      messages: '{VALUE} is not valid'
    },
    required: [true, "Gender must be required"],
  },
  dateOfBirth: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  emergencyContactNo: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      messages: '{VALUE} is not valid'
    },
    required: [true, "Blood group must be required"]
  },
  presentAddress: {
    type: String,
    required: true,
  },
  permanentAddress: {
    type: String,
    required: true,
  },
  guardian: {
    type: guardianSchema,
    required: [true, "Guardian must be required"]
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, "Local guardian must be required"]
  },
  profileImage: { type: String },
  isActive: {
    type: String,
    enum: {
      values: ['active', 'blocked'],
      messages: '{VALUE} is not valid'
    },
    default: 'active'
  },
},
{
  timestamps: true
}
);

export const Student = model<TStudent>("Student", studentSchema);

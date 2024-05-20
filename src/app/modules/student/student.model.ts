import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'
import {
  StudentCustomInstanceMethods,
  StudentCustomInstanceModel,
  StudentCustomStaticModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student.interface'
import config from '../../config'

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name must be required'],
    trim: true,
    maxlength: [20, 'First name can not be more than 20 characters'],
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, 'Last name must be required'],
  },
})

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, 'Father name must be required'],
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Father occupation must be required'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father contact no must be required'],
  },
  motherName: {
    type: String,
    required: [true, 'Mother name must be required'],
  },
  motherOccupation: {
    type: String,
    required: [true, 'Mother occupation must be required'],
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother contact no must be required'],
  },
})

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, 'Name must be required'],
  },
  occupation: {
    type: String,
    required: [true, 'Occupation must be required'],
  },
  contactNo: {
    type: String,
    required: [true, 'Contact no must be required'],
  },
  address: {
    type: String,
    required: [true, 'Address must be required'],
  },
})

// =========================================================

// const studentSchema = new Schema<TStudent, StudentCustomInstanceModel, StudentCustomInstanceMethods>({
const studentSchema = new Schema<TStudent, StudentCustomStaticModel>(
  {
    id: {
      type: String,
      required: [true, 'Id must be required'],
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: userNameSchema,
      required: [true, 'Name must be required'],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        messages: '{VALUE} is not valid',
      },
      required: [true, 'Gender must be required'],
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
        messages: '{VALUE} is not valid',
      },
      required: [true, 'Blood group must be required'],
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
      required: [true, 'Guardian must be required'],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, 'Local guardian must be required'],
    },
    profileImage: { type: String },
    isActive: {
      type: String,
      enum: {
        values: ['active', 'blocked'],
        messages: '{VALUE} is not valid',
      },
      default: 'active',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true
    }
  },
)

// ===================================================================

// pre middleware hook //
studentSchema.pre('save', async function (next) {
  const user = this
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  )
  next()
})

// ===================================================================

// post middleware hook //
studentSchema.post('save', function (doc, next) {
  doc.password = ''
  next()
})

// ===================================================================

// query middleware hook //
// studentSchema.pre('find', function (next) {
//   this.find({ isDeleted: { $ne: true } }) // Mane je document gulor moddhe isDeleted filed nai se golo show korbe
//   next()
// })

// studentSchema.pre('findOne', function (next) {
//   this.find({ isDeleted: { $ne: true } }) // Mane je document gulor moddhe isDeleted filed nai seta show korbe
//   next()
// })

// ===================================================================


// virtual middleware hook //
studentSchema.virtual("fullName").get(function(){
  return (
    `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`
  )
});

studentSchema.virtual("designation").get(function(){
  return "student"
})

// ===================================================================

// custom instance methods //
// studentSchema.methods.isUserExists = async function(id:string){
//   const existingUser = await Student.findOne({ id })
//   return existingUser
// };

// ===================================================================

// custom static methods
// studentSchema.statics.isUserExists = async function(id: string){
//   const existingUser = await Student.findOne({id})
//   return existingUser
// };

// ===================================================================

export const Student = model<TStudent>('Student', studentSchema)

// export const Student = model<TStudent,StudentCustomInstanceModel>("Student", studentSchema);
// export const Student = model<TStudent,StudentCustomStaticModel>("Student", studentSchema);

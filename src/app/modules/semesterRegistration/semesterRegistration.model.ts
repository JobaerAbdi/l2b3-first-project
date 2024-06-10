import mongoose, { Schema, model } from 'mongoose';
import { SemesterRegistrationStatus } from './semesterRegistration.constant';
import { TSemesterRegistration } from './semesterRegistration.interface';

const semesterRegistrationSchema = new Schema<TSemesterRegistration>(
  {
    academicSemester: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: 'AcademicSemester',
    }, 
    status: {
      type: String,
      enum: SemesterRegistrationStatus,  // ['UPCOMING', 'ONGOING', 'ENDED']
      default: 'UPCOMING',  //// default value
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    minCredit: {
      type: Number,
      default: 3, //// default value
    },
    maxCredit: {
      type: Number,
      default: 15,  //// default value
    },
  },
  {
    timestamps: true,
  },
);

export const SemesterRegistration = model<TSemesterRegistration>(
  'SemesterRegistration',
  semesterRegistrationSchema,
);
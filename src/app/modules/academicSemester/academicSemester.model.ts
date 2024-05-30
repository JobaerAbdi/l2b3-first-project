import { Schema, model } from 'mongoose'
import TAcademicSemester, { TCodes, TMonths, TNames } from './academicSemester.interface'

const months:TMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const semesterName: TNames[] = ['Autumn', 'Summer', 'Fall'];

const semesterCode: TCodes[] = ['01', '02', '03'];

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      enum: semesterName,
      required: true,
    },
    year: {
     type: String,
     required: true
    },
    code: {
      type: String,
      enum: semesterCode,
      required: true,
    },
    startMonth: {
      type: String,
      enum: months,
      required: true,
    },
    endMonth: {
      type: String,
      enum: months,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
)

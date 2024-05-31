import { Schema, model } from 'mongoose'
import TAcademicSemester, {
  TCodes,
  TMonths,
  TNames,
} from './academicSemester.interface'

const months: TMonths[] = [
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
]

const semesterName: TNames[] = ['Autumn', 'Summer', 'Fall']

const semesterCode: TCodes[] = ['01', '02', '03']

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      enum: semesterName,
      required: true,
    },
    year: {
      type: String,
      required: true,
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

// এখানে client থেকে যে name এবং year পাঠানো হচ্ছে সেটা আগে থেকে ডাটাবেজে এ exists করে কিনা!
// যদি exists করে তাহলে throw new Error করা হচ্ছে, 
// আর যদি exists না করে তাহলে next এর মাধ্যমে পরবর্তী  middleware পাঠানো হচ্ছে।

// এই লজিকটা সবার জন্য কমন তাই মডেলে স্থাপন করা হয়েছে।

academicSemesterSchema.pre('save', async function (next) {
  const isUserExists = await AcademicSemester.findOne({  
    name: this.name,
    year: this.year,
  })
  // console.log(isUserExists);
  if (isUserExists) {
    throw new Error('Academic semester is already exists!')
  }
  next()
})

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
)

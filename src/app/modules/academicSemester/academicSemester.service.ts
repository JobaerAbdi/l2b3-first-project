import TAcademicSemester from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  type TAcademicSemesterNameCodeMapper = {
    [key: string]: string  // এখানে key হচ্ছে sting এবং তার value ও হোল্ড করে string.
  }

  const academicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
    Autumn: '01',
    Summer: '02',
    Fall: '03',
  }
 
  // Suppose এখানে payload  থেকে আসা name যদি Fall হয় তাহলে Bracket Notation এর কারণে !== এর আগের অংশের মান "03 "হবে এবং paload.code এর মান যদি "03" না হয় তাহলে name এবং code সমান হবে না, তখন error throw করবে। আর যদি name এবং code সঠিক হয় তাহলে ডাটাবেজ এ create হবে।

  // এই লজিকটা সবার জন্য কমন না তাই Service এ স্থাপন করা হয়েছে। 

  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid semester code!')
  }

  const result = await AcademicSemester.create(payload)
  return result
}

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
}

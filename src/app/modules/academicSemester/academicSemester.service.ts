import TAcademicSemester from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  type TAcademicSemesterNameCodeMapper = {
    [key: string]: string // এখানে key হচ্ছে sting এবং তার value ও হোল্ড করে string.
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

const getAllAcademicSemesterFromDB = async () => {
  const result = await AcademicSemester.find()
  return result
}

const getSingleAcademicSemesterFromDB = async (id: string) => {
  const result = await AcademicSemester.findById(id)
  return result
}

const updateSingleAcademicSemesterIntoDB = async (id: string, payload: Partial<TAcademicSemester>) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error('Invalid Semester Code')
  }
  const result = await AcademicSemester.findByIdAndUpdate(
    id, 
    payload, 
    {new: true,runValidators: true})
  return result
}

// const updateAcademicSemesterIntoDB = async (id: string,payload: Partial<TAcademicSemester>) => {
//   if (
//     payload.name &&
//     payload.code &&
//     academicSemesterNameCodeMapper[payload.name] !== payload.code
//   ) {
//     throw new Error('Invalid Semester Code');
//   }

//   const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
//     new: true,
//   });
//   return result;
// };

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterFromDB,
  getSingleAcademicSemesterFromDB,
  updateSingleAcademicSemesterIntoDB,
}

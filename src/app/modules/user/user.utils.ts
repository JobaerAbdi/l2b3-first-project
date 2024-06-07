// year => semesterCode => 4 digit number

import TAcademicSemester from '../academicSemester/academicSemester.interface'
import { User } from './user.model'

// const findLastStudentId = async () => {
//   const lastStudent = await User.findOne(
//     { role: "student"},
//     { id: 1, _id: 0 },
//     { sort: { createdAt: -1 } }
//   ).lean();

//   return lastStudent?.id ? lastStudent.id : null;
// };

const findLastStudentId = async (year: string, code: string) => {
  const lastStudent = await User.findOne(
    { role: "student", id: { $regex: `${year}${code}` } },
    { id: 1, _id: 0 },
    { sort: { createdAt: -1 } }
  ).lean();

  return lastStudent?.id ? lastStudent.id : null;
};

// 2030 =>     01       =>     0001   // 2030010001
export const generateStudentId = async (payload: TAcademicSemester) => {
  let currentId = (0).toString() //=> '0'

  const lastStudentId = await findLastStudentId(payload.year, payload.code) // 2030010001
  // console.log('lastStudentId01=>', lastStudentId)

  const lastStudentSemesterCode = lastStudentId?.substring(4, 6) // 01
  const lastStudentYear = lastStudentId?.substring(0, 4) // 2030
  // console.log("hellow",lastStudentSemesterCode, lastStudentYear);
  

  const currentStudentSemesterCode = payload.code // 01
  const currentStudentYear = payload.year // 2030
  // console.log(payload.code);
  // console.log(payload.year);

  if (
    lastStudentId &&
    lastStudentSemesterCode === currentStudentSemesterCode &&
    lastStudentYear === currentStudentYear
  ) {
    // console.log("currentIdUpper",currentId)
    // console.log('lastStudentId02=>', lastStudentId)
    currentId = lastStudentId.substring(6) 
    // console.log("currentIdDown",currentId)
  }
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0') //=> 0001
  incrementId = `${payload.year}${payload.code}${incrementId}` // 2030 01 0001
  //  console.log(incrementId);
  return incrementId
}


// ====================================================================================

// Faculty ID
export const findLastFacultyId = async () => {
  const lastFaculty = await User.findOne(
    {
      role: 'faculty',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateFacultyId = async () => {
  let currentId = (0).toString();
  const lastFacultyId = await findLastFacultyId();

  if (lastFacultyId) {
    currentId = lastFacultyId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `F-${incrementId}`;

  return incrementId;
};

// ====================================================================================
export const findLastAdminId = async () => {
  const lastAdmin = await User.findOne(
    {
      role: 'admin',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
};
export const generateAdminId = async()=> {
  let currentId = (0).toString();
  const lastAdminId = await findLastAdminId();
  if (lastAdminId) {
    currentId = lastAdminId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `A-${incrementId}`;
  return incrementId;
}



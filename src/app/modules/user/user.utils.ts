  // year => semesterCode => 4 digit number

import TAcademicSemester from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";

 const findLastStudentId = async()=>{
    const lastStudent = await User.findOne(
        {role: "student"},
        {id: 1, _id: 0},
    ).sort({createdAt: -1}).lean()
    return lastStudent?.id ? lastStudent.id : undefined
 }

  // 2030 =>     01       =>     0001   // 2030010001
  const generateStudentId = async (payload: TAcademicSemester)=>{
     let currentId = (0).toString()  //=> '0' 
     
     const lastStudentId = await findLastStudentId()    // 2030010001

     const lastStudentSemesterCode = lastStudentId?.substring(4,6) // 01
     const lastStudentYear = lastStudentId?.substring(4) // 2030

     const currentStudentSemesterCode = payload.code // 01
     const currentStudentYear = payload.year // 2030

     if(lastStudentId && 
      lastStudentSemesterCode === currentStudentSemesterCode && 
      lastStudentYear === currentStudentYear){
      currentId = lastStudentId.substring(6) 
     }
     let incrementId = (Number(currentId)+ 1).toString().padStart(4,'0') //=> 0001
     incrementId = `${payload.year}${payload.code}${incrementId}` // 2030 01 0001
     return incrementId
    console.log(await findLastStudentId());
    
  }

  export default generateStudentId;
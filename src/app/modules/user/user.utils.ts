  // year => semesterCode => 4 digit number

import TAcademicSemester from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";

 const findLastStudentId = async()=>{
    const lastStudent = await User.findOne(
        {role: "student"},
        {id: 1, _id: 0},
    ).sort({createdAt: -1}).lean()
    return lastStudent?.id ? lastStudent.id.substring(6) : undefined
 }

  // 2030 =>     01       =>     0001   // 2030010001
  const generateStudentId = async (payload: TAcademicSemester)=>{
     const currentId = await findLastStudentId() || (0).toString()  //=> '0' 
     let incrementId = (Number(currentId)+ 1).toString().padStart(4,'0') //=> 0001
     incrementId = `${payload.year}${payload.code}${incrementId}` // 2030 01 0001
     return incrementId
    console.log(await findLastStudentId());
    
  }

  export default generateStudentId;
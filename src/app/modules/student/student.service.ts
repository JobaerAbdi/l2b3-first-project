import { TStudent } from "./student.interface";
import { Student } from "./student.model";

const createStudentIntoDB =async(payload:TStudent )=>{
// const data = await Student.create(payload) // build in static methods
// return data 
   const student = new Student(payload)
   const result = await student.save()
   return result
}

const getAllStudentsFromDB = async()=>{
    const result = await Student.find();
    return result;
}
const getSingleStudentFromDB = async(id: string)=>{
    const result = await Student.findOne({id});
    console.log(result);
    return result;
}

export const StudentServices = {
    createStudentIntoDB,
    getAllStudentsFromDB,
    getSingleStudentFromDB
}
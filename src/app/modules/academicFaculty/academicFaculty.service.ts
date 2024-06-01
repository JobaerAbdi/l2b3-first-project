import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";

const createAcademicFacultyIntoDB = async(payload: TAcademicFaculty)=>{
    const result = await AcademicFaculty.create(payload)
    return result
}

const getAllAcademicFacultyFromDB = async()=>{
    const result = await AcademicFaculty.find()
    return result
}

const getSingleFacultyFromDB = async(id: string)=>{
    const result = await AcademicFaculty.findById(id)
    return result
}

const updateFacultyIntoDb = async(id:string, payload: Partial<TAcademicFaculty>)=>{
  const result = await AcademicFaculty.findByIdAndUpdate(
    id,
    payload,
    {new: true, runValidators: true}
  )
  return result
}

export const AcademicFaultyServices = {
    createAcademicFacultyIntoDB,
    getAllAcademicFacultyFromDB,
    getSingleFacultyFromDB,
    updateFacultyIntoDb
}
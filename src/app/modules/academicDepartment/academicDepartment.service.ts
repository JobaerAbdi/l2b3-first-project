import TAcademicDepartment from './academicDepartment.interface'
import { AcademicDepartment } from './academicDepartment.model'

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  // const isDepartmentExists = await AcademicDepartment.findOne({
  //     name: payload?.name
  // })
  // if(isDepartmentExists){
  //     throw new Error("This department is already exists!")
  // }

  const result = await AcademicDepartment.create(payload)
  return result
}

const getAllAcademicDepartmentFromDB = async () => {
   const result = await AcademicDepartment.find()
   return result
}

const getSingleAcademicDepartmentFromDB = async (id: string) => {
  const result =
    await AcademicDepartment.findById(id).populate('academicFaculty')
  return result
}

const updateAcademicDepartmentFromDB = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartment.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}

/*
// ======> For using query middleware in model (START) <======
const updateAcademicDepartmentFromDB = async(id: string, payload: Partial<TAcademicDepartment>)=>{
    const result = await AcademicDepartment.findOneAndUpdate(
        {_id: id},
        payload,
        {new: true, runValidators: true}
    )
    return result
}
// ======> For using query middleware in model (END) <======
*/

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentFromDB,
}

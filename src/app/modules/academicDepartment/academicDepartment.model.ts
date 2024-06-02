import { Schema, model } from "mongoose";
import TAcademicDepartment from "./academicDepartment.interface";

const academicDepartmentSchema = new Schema<TAcademicDepartment>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    academicFaculty: {
        type: Schema.Types.ObjectId,
        ref: "AcademicFaculty"
    }
},
{
    timestamps: true
})
// Document middleware
academicDepartmentSchema.pre("save", async function(next){
  const isDepartmentExists = await AcademicDepartment.findOne({
    name: this?.name
  })
//   console.log(isDepartmentExists);
  if(isDepartmentExists){
    throw new Error("This department is already exists!")
  }
  next()
})

/*
// ======> Query middleware (START) <======
const updateAcademicDepartmentFromDB = async(id: string, payload: Partial<TAcademicDepartment>)=>{
    const result = await AcademicDepartment.findOneAndUpdate(
        {_id: id},
        payload,
        {new: true, runValidators: true}
    )
    return result
}

academicDepartmentSchema.pre("findOneAndUpdate", async function(next){
    const query = this.getQuery()
    const isDepartmentExists = await AcademicDepartment.findOne(query)
    if(!isDepartmentExists){
        throw new Error("This department does not exists!")
    }
    next()
})
// ======> Query middleware (END) <======
*/


export const AcademicDepartment = model<TAcademicDepartment>("AcademicDepartment", academicDepartmentSchema)
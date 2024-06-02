import { Schema, model } from "mongoose";
import { TAcademicFaculty } from "./academicFaculty.interface";

const academicFacultySchema = new Schema<TAcademicFaculty>({
   name: {
    type: String,
    required: true
   }
},
{
    timestamps: true
})
// Document middleware
academicFacultySchema.pre("save", async function(next){
    const isFacultyExists = await AcademicFaculty.find({
        name: this.name
    })
    if(isFacultyExists){
     throw new Error("This faculty is already exists!")
    }
    next() // => mongoose er next
})

export const AcademicFaculty = model<TAcademicFaculty>("AcademicFaculty", academicFacultySchema)
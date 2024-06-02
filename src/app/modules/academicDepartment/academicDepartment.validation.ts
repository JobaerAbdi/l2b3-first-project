import { z } from 'zod'

const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    academicDepartment: z.object({
      name: z.string({
        required_error: 'AcademicDepartment is required',
        invalid_type_error: 'AcademicDepartment must be a string',
      }),
      academicFaculty: z.string({
        required_error: 'AcademicFaculty is required',
        invalid_type_error: 'AcademicFaculty must be a string',
      })
    })
  }),
})

const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    academicDepartment: z.object({
      name: z.string({
        required_error: 'AcademicDepartment is required',
        invalid_type_error: 'AcademicDepartment must be a string',
      }).optional(),
      academicFaculty: z.string({
        required_error: 'AcademicFaculty is required',
        invalid_type_error: 'AcademicFaculty must be a string',
      }).optional()
    })
  }),
})



export const academicDepartmentValidation = {
    createAcademicDepartmentValidationSchema,
    updateAcademicDepartmentValidationSchema
}

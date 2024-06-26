import { z } from 'zod'

const createAcademicFaultyValidationSchema = z.object({
  body: z.object({
    academicFaculty: z.object({
      name: z.string({
        required_error: 'Name is required',
        invalid_type_error: 'Name must be a string',
      }),
    }),
  }),
})

const updateAcademicFaultyValidationSchema = z.object({
  body: z.object({
    academicFaculty: z.object({
      name: z.string({
        required_error: 'Name is required',
        invalid_type_error: 'Name must be a string',
      }),
    }),
  }).optional(),
})

export const academicFacultyValidation = {
  createAcademicFaultyValidationSchema,
  updateAcademicFaultyValidationSchema
}

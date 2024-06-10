import { z } from 'zod'
const preRequisiteCoursesValidationSchema = z
  .object({
    course: z.string({
      required_error: 'Course Id is required',
      invalid_type_error: 'Course Id must be a string',
    }),
  })
  .optional()

const createCourseValidationSchema = z.object({
  body: z.object({
    courseData: z.object({
      title: z.string({
        required_error: 'Title is required',
        invalid_type_error: 'Title must be a string',
      }),
      prefix: z.string({
        required_error: 'Prefix is required',
        invalid_type_error: 'Prefix must be a string',
      }),
      code: z.number(),
      credits: z.number(),
      preRequisiteCourses: z
        .array(preRequisiteCoursesValidationSchema)
        .optional(),
    }),
  }),
})

const updateCourseValidationSchema = z.object({
  body: z.object({
    courseData: z.object({
      title: z
        .string({
          required_error: 'Title is required',
          invalid_type_error: 'Title must be a string',
        })
        .optional(),
      prefix: z
        .string({
          required_error: 'Prefix is required',
          invalid_type_error: 'Prefix must be a string',
        })
        .optional(),
      code: z.number().optional(),
      credits: z.number().optional(),
      preRequisiteCourses: z
        .array(preRequisiteCoursesValidationSchema)
        .optional(),
    }),
  }),
})

//-------------------------------------------------------------------------------------------
//           courseFaculty validation
const facultiesWithCourseValidationSchema = z.object({
  body: z.object({
    faculties: z.array(
      z.string({
        required_error: 'Faculties are required',
        invalid_type_error: 'Faculties are must be a string',
      }),
    ),
  }),
})

export const courseValidations = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
  facultiesWithCourseValidationSchema,
}

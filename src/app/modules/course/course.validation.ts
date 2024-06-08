import { z } from 'zod'
const preRequisiteCoursesSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().default(false)
})

const createCourseValidationSchema = z.object({
  body: z.object({
    courseData: z.object({
      title: z.string(),
      prefix: z.string(),
      code: z.number(),
      credits: z.number(),
      preRequisiteCourses: z.array(preRequisiteCoursesSchema),
    }),
  }),
})

const updateCourseValidationSchema = z.object({
  body: z.object({
    courseData: z.object({
      title: z.string().optional(),
      prefix: z.string().optional(),
      code: z.number().optional(),
      credits: z.number().optional(),
      preRequisiteCourses: z.array(preRequisiteCoursesSchema).optional(),
    }),
  }),
})

export const courseValidations = {
    createCourseValidationSchema,
    updateCourseValidationSchema
}

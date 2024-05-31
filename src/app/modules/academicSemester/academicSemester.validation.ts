import { z } from 'zod'

const semesterName = ['Autumn', 'Summer', 'Fall']
const semesterCode = ['01', '02', '03']
const semesterMonth = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const createAcademicSemesterSchema = z.object({
  body: z.object({
    academicSemesterData: z.object({
      name: z.enum([...semesterName] as [string, ...string[]]),
      year: z.string(),
      code: z.enum([...semesterCode] as [string, ...string[]]),
      startMonth: z.enum([...semesterMonth] as [string, ...string[]]),
      endMonth: z.enum([...semesterMonth] as [string, ...string[]]),
    }),
  }),
})

const updateAcademicSemesterSchema = z.object({
  body: z.object({
    academicSemesterData: z.object({
      name: z.enum([...semesterName] as [string, ...string[]]).optional(),
      year: z.string().optional(),
      code: z.enum([...semesterCode] as [string, ...string[]]).optional(),
      startMonth: z.enum([...semesterMonth] as [string, ...string[]]).optional(),
      endMonth: z.enum([...semesterMonth] as [string, ...string[]]).optional(),
    }),
  }),
})

export const academicSemesterSchema = {
  createAcademicSemesterSchema,
  updateAcademicSemesterSchema
}

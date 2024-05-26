import { z } from 'zod'

const userValidationSchema = z.object({
  id: z.string(),
  password: z.string({
    invalid_type_error: 'Password must be a string',
  })
})

export default userValidationSchema

// const password = z.string({
//   required_error: 'Password is required',
//   invalid_type_error: 'Password must be a string',
// })

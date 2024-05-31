import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { StudentRoutes } from './app/modules/student/student.route'
import { UserRoutes } from './app/modules/user/user.route'
import { AcademicSemesterRoutes } from './app/modules/academicSemester/academicSemester.route'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import notFound from './app/middlewares/notFound'
const app: Application = express()

// parsers
app.use(express.json())
app.use(cors())

// Application routes

app.use('/api/v1/students', StudentRoutes)
app.use('/api/v1/users', UserRoutes)
app.use('/api/v1/academicSemester', AcademicSemesterRoutes)

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Welcome to L2B3 first project",
    data: ''
  })
})

app.use(notFound)
app.use(globalErrorHandler)
export default app

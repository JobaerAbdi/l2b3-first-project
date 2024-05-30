import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { StudentRoutes } from './app/modules/student/student.route'
import { UserRoutes } from './app/modules/user/user.route'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import notFound from './app/middlewares/notFound'
const app: Application = express()

// parsers
app.use(express.json())
app.use(cors())

// Application routes

app.use('/api/v1/students', StudentRoutes)
app.use('/api/v1/users', UserRoutes)

app.get('/', (req: Request, res: Response) => {
  const a = 10
  res.send(a)
})

app.use(notFound)
app.use(globalErrorHandler)
export default app

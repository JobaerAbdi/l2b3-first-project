import express from 'express'
import { UserControllers } from './user.controller'
const router = express.Router()

router.post('/create-student', UserControllers.createStudent)
// router.post('/create-admin', UserControllers)
// router.post('/create-faculty', UserControllers)

export const UserRoutes = router

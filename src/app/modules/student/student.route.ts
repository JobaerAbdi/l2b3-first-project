import express from "express";
import { StudentControllers } from "./student.controller";
const router = express.Router();  // router  is a object

router.post('/create-student', StudentControllers.createStudentIntoDB)

router.get('/', StudentControllers.getAllStudents)

router.get('/:studentId', StudentControllers.getSingleStudent)

router.delete("/:studentId", StudentControllers.deleteStudent)


export const StudentRoutes = router;
import express from "express";
import { StudentControllers } from "./student.controller";
import validationRequest from "../../middlewares/validateRequest";
import { studentValidationSchemas } from "./student.validation";
const router = express.Router();  // router  is a object


router.get('/', StudentControllers.getAllStudents)

router.get('/:studentId', StudentControllers.getSingleStudent)

router.patch('/:studentId',
validationRequest(studentValidationSchemas.updateStudentValidationSchema), 
StudentControllers.updateStudent)

router.delete("/:studentId", StudentControllers.deleteStudent)


export const StudentRoutes = router;
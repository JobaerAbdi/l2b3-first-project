import express from "express";
import { StudentControllers } from "./student.controller";
import validationRequest from "../../middlewares/validateRequest";
import { studentValidationSchemas } from "./student.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
const router = express.Router();  // router  is a object


router.get('/', 
    auth(USER_ROLE.admin, USER_ROLE.admin),
    StudentControllers.getAllStudents
)

router.get('/:id', StudentControllers.getSingleStudent)

router.patch('/:id',
validationRequest(studentValidationSchemas.updateStudentValidationSchema), 
StudentControllers.updateStudent)

router.delete("/:id", StudentControllers.deleteStudent)


export const StudentRoutes = router;
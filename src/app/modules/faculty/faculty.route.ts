// import express from 'express';
// import { FacultyControllers } from './faculty.controller';
// import validationRequest from '../../middlewares/validateRequest';
// import { facultyValidations } from './faculty.validation';

// const router = express.Router();

// router.get('/', FacultyControllers.getAllFaculties);

// router.get('/:id', FacultyControllers.getSingleFaculty);

// router.patch('/:id',
// validationRequest(facultyValidations.createFacultyValidationSchema),
// FacultyControllers.updateFaculty
// );

// router.delete('/:id', FacultyControllers.deleteFaculty);


// export const FacultyRoutes = router;









import express from "express";
import { FacultyControllers } from "./faculty.controller";
import validationRequest from "../../middlewares/validateRequest";
import { facultyValidations } from "./faculty.validation";

const router = express.Router();

router.get("/", FacultyControllers.getAllFaculties);

router.get("/:id", FacultyControllers.getSingleFaculty);

router.patch("/:id",
validationRequest(facultyValidations.updateFacultyValidationSchema),
FacultyControllers.updateFaculty
);

router.delete("/:id", FacultyControllers.deleteFaculty)

export const FacultyRoutes = router;
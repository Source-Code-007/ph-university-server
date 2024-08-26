import { Router } from 'express'
import zodValidateHandler from '../../middleware/zodValidateHandler'
import { academicFacultyController } from './academicFaculty.controller'
import {
  createAcademicFacultyZodSchema,
  updateAcademicFacultyZodSchema,
} from './academicFaculty.validate'
import auth from '../../middleware/auth'
import { USER_ROLE } from '../user/user.constant'

const router = Router()
router.post(
  '/',
  auth(USER_ROLE.ADMIN),
  zodValidateHandler(createAcademicFacultyZodSchema),
  academicFacultyController.insertAcademicFaculty,
)
router.get(
  '/',
  auth(USER_ROLE.ADMIN, USER_ROLE.STUDENT, USER_ROLE.FACULTY),
  academicFacultyController.getAllAcademicFaculties,
)
router.get(
  '/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.STUDENT, USER_ROLE.FACULTY),
  academicFacultyController.getAcademicFacultyById,
)
router.delete(
  '/:id',
  auth(USER_ROLE.ADMIN),
  academicFacultyController.deleteAcademicFacultyById,
)
router.patch(
  '/:id',
  auth(USER_ROLE.ADMIN),
  zodValidateHandler(updateAcademicFacultyZodSchema),
  academicFacultyController.updateAcademicFacultyById,
)

export { router as academicFacultyRouter }

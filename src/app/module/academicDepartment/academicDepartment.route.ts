import { Router } from 'express'
import zodValidateHandler from '../../middleware/zodValidateHandler'
import {
  createAcademicDepartmentZodSchema,
  updateAcademicDepartmentZodSchema,
} from './academicDepartment.validate'
import { academicDepartmentController } from './academicDepartment.controller'
import auth from '../../middleware/auth'
import { USER_ROLE } from '../user/user.constant'

const router = Router()

router.post(
  '/',
  auth(USER_ROLE.ADMIN),
  zodValidateHandler(createAcademicDepartmentZodSchema),
  academicDepartmentController.insertAcademicDepartment,
)
router.get(
  '/',
  auth(USER_ROLE.STUDENT, USER_ROLE.FACULTY, USER_ROLE.ADMIN),
  academicDepartmentController.getAllAcademicDepartments,
)
router.get(
  '/:id',
  auth(USER_ROLE.STUDENT, USER_ROLE.FACULTY, USER_ROLE.ADMIN),
  academicDepartmentController.getAcademicDepartmentById,
)
router.delete(
  '/:id',
  auth(USER_ROLE.ADMIN),
  academicDepartmentController.deleteAcademicDepartmentById,
)
router.patch(
  '/:id',
  auth(USER_ROLE.ADMIN),
  zodValidateHandler(updateAcademicDepartmentZodSchema),
  academicDepartmentController.updateAcademicDepartmentById,
)

export { router as academicDepartmentRouter }

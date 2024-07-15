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
router.get('/', auth(USER_ROLE.ADMIN), academicDepartmentController.getAllAcademicDepartments)
router.get('/:id', academicDepartmentController.getAcademicDepartmentById)
router.delete('/:id', academicDepartmentController.deleteAcademicDepartmentById)
router.patch(
  '/:id',
  zodValidateHandler(updateAcademicDepartmentZodSchema),
  academicDepartmentController.updateAcademicDepartmentById,
)

export { router as academicDepartmentRouter }

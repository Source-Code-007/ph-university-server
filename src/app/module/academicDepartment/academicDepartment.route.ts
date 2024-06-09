import { Router } from 'express'
import zodValidateHandler from '../../middleware/zodValidateHandler'
import {
  createAcademicDepartmentZodSchema,
  updateAcademicDepartmentZodSchema,
} from './academicDepartment.validate'
import { academicDepartmentController } from './academicDepartment.controller'

const router = Router()

router.post(
  '/',
  zodValidateHandler(createAcademicDepartmentZodSchema),
  academicDepartmentController.insertAcademicDepartment,
)
router.get('/', academicDepartmentController.getAllAcademicDepartments)
router.get('/:id', academicDepartmentController.getAcademicDepartmentById)
router.delete('/:id', academicDepartmentController.deleteAcademicDepartmentById)
router.patch(
  '/:id',
  zodValidateHandler(updateAcademicDepartmentZodSchema),
  academicDepartmentController.updateAcademicDepartmentById,
)

export { router as academicDepartmentRouter }

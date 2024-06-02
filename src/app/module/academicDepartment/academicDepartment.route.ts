import { Router } from 'express'
import { createAcademicDepartmentZodSchema, updateAcademicDepartmentZodSchema } from './academicDepartment.validate.ts.js'
import { academicDepartmentController } from './academicDepartment.controller.js'
import zodValidateHandler from '../../middleware/zodValidateHandler.js'


const router = Router()

router.post(
  '/',
  zodValidateHandler(createAcademicDepartmentZodSchema),
  academicDepartmentController.insertAcademicDepartment,
)
router.get('/', academicDepartmentController.getAllAcademicDepartments)
router.get('/:id',academicDepartmentController.getAcademicDepartmentById)
router.delete('/',academicDepartmentController.deleteAllAcademicDepartments)
router.delete('/:id',academicDepartmentController.deleteAcademicDepartmentById)
router.patch(
  '/:id',
  zodValidateHandler(updateAcademicDepartmentZodSchema),
 academicDepartmentController.updateAcademicDepartmentById,
)

export { router as academicDepartmentRouter }

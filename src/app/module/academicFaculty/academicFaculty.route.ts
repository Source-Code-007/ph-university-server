import { Router } from 'express'
import zodValidateHandler from '../../middleware/zodValidateHandler'
import {
  createAcademicFacultyZodSchema,
  updateAcademicFacultyZodSchema,
} from './academicFaculty.validate.ts'
import { academicFacultyController } from './academicFaculty.controller'

const router = Router()


router.post(
  '/',
  zodValidateHandler(createAcademicFacultyZodSchema),
  academicFacultyController.insertAcademicFaculty,
)
router.get('/', academicFacultyController.getAllAcademicFaculty)
router.get('/:id', academicFacultyController.getAcademicFacultyById)
router.delete('/', academicFacultyController.deleteAllAcademicFaculty)
router.delete('/:id', academicFacultyController.deleteAcademicFacultyById)
router.patch(
  '/:id',
  zodValidateHandler(updateAcademicFacultyZodSchema),
  academicFacultyController.updateAcademicFacultyById,
)

export { router as academicFacultyRouter }

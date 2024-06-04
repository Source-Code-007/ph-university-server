import { Router } from 'express'
import zodValidateHandler from '../../middleware/zodValidateHandler'
import { academicFacultyController } from './academicFaculty.controller'
import { createAcademicFacultyZodSchema, updateAcademicFacultyZodSchema } from './academicFaculty.validate'



const router = Router()
router.post(
  '/',
  zodValidateHandler(createAcademicFacultyZodSchema),
  academicFacultyController.insertAcademicFaculty,
)
router.get('/', academicFacultyController.getAllAcademicFaculties)
router.get('/:id', academicFacultyController.getAcademicFacultyById)
router.delete('/', academicFacultyController.deleteAllAcademicFaculties)
router.delete('/:id', academicFacultyController.deleteAcademicFacultyById)
router.patch(
  '/:id',
  zodValidateHandler(updateAcademicFacultyZodSchema),
  academicFacultyController.updateAcademicFacultyById,
)


export { router as academicFacultyRouter }

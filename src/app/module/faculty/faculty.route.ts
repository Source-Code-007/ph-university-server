import { Router } from 'express'
import { facultyControllers } from './faculty.controller'

const router = Router()

router.get('/', facultyControllers.getAllFaculty)
router.get('/:id', facultyControllers.getFacultyById)
router.delete('/:id', facultyControllers.deleteFacultyById)
router.patch('/:id', facultyControllers.updateFacultyById)

export { router as facultyRouter }

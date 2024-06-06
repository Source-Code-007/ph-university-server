import { Router } from 'express'
import { studentController } from './student.controller'
import zodValidateHandler from '../../middleware/zodValidateHandler'
import { updateStudentZodSchema } from './student.validate'

const router = Router()

router.get('/', studentController.getAllStudent)
router.get('/:id', studentController.getStudentById)
router.patch('/:id', zodValidateHandler(updateStudentZodSchema), studentController.updateStudentById)

export { router as studentRouter }

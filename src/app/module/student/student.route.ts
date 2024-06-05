import { Router } from 'express'
import { studentController } from './student.controller'

const router = Router()

router.get('/', studentController.getAllStudent)
router.get('/:id', studentController.getStudentById)

export { router as studentRouter }

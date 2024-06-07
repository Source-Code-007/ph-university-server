import { Router } from 'express'

import zodValidateHandler from '../../middleware/zodValidateHandler'

import { userController } from './user.controller'
import { createStudentZodSchema } from '../student/student.validate'
import { createFacultyZodSchema } from '../faculty/faculty.validate.ts'
import { createAdminZodSchema } from '../admin/admin.validate.ts'

const router = Router()

router.post('/create-student', zodValidateHandler(createStudentZodSchema), userController.insertStudent)
router.post('/create-faculty', zodValidateHandler(createFacultyZodSchema), userController.insertFaculty)
router.post('/create-admin', zodValidateHandler(createAdminZodSchema), userController.insertAdmin)
router.get('/', userController.getAllUsers)
router.get('/:id', userController.getUserById)

export { router as userRouter }

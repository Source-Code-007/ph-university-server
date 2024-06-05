import { Router } from 'express'

import zodValidateHandler from '../../middleware/zodValidateHandler'

import { userController } from './user.controller'
import { createStudentZodSchema } from '../student/student.validate'

const router = Router()

router.post('/create-student', zodValidateHandler(createStudentZodSchema), userController.insertStudent)
router.get('/', userController.getAllUsers)
router.get('/:id', userController.getUserById)
router.delete('/', userController.deleteAllUsers)
router.delete('/:id', userController.deleteUserById)
router.patch('/:id', userController.updateUserById)
router.patch('/status/:id', userController.toggleUserStatus)

export { router as userRouter }

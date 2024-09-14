import { Router } from 'express'

import zodValidateHandler from '../../middleware/zodValidateHandler'

import { userController } from './user.controller'
import { createStudentZodSchema } from '../student/student.validate'
import { createFacultyZodSchema } from '../faculty/faculty.validate.ts'
import { createAdminZodSchema } from '../admin/admin.validate'
import auth from '../../middleware/auth'
import { USER_ROLE } from './user.constant'


const router = Router()

router.post(
  '/create-student',
  auth(USER_ROLE.ADMIN),
  zodValidateHandler(createStudentZodSchema),
  userController.insertStudent,
)
router.post(
  '/create-faculty',
  zodValidateHandler(createFacultyZodSchema),
  userController.insertFaculty,
)
router.post(
  '/create-admin',
  zodValidateHandler(createAdminZodSchema),
  userController.insertAdmin,
)

router.get(
  '/me',
  auth(USER_ROLE.ADMIN, USER_ROLE.FACULTY, USER_ROLE.STUDENT),
  userController.getMe,
)
// Not secured for blood donor (TODO: Only admin and faculty should be access)
router.get('/', userController.getAllUsers)
router.get('/:id', userController.getUserById)

export { router as userRouter }

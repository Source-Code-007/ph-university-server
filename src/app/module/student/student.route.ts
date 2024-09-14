import { Router } from 'express'
import { studentController } from './student.controller'
import zodValidateHandler from '../../middleware/zodValidateHandler'
import { updateStudentZodSchema } from './student.validate'
import auth from '../../middleware/auth'
import { USER_ROLE } from '../user/user.constant'

const router = Router()

router.get(
  '/',
  // auth(USER_ROLE.ADMIN),
  studentController.getAllStudent,
)
router.get(
  '/:id',
  auth(USER_ROLE.STUDENT, USER_ROLE.ADMIN),
  studentController.getStudentById,
)
router.patch(
  '/:id',
  auth(USER_ROLE.ADMIN),
  zodValidateHandler(updateStudentZodSchema),
  studentController.updateStudentById,
)

router.patch(
  '/toggle-blood-donor/:id',
  auth(USER_ROLE.STUDENT),
  studentController.toggleBloodDonor,
)

router.delete(
  '/:id',
  auth(USER_ROLE.ADMIN),
  studentController.deleteStudentById,
)

export { router as studentRouter }

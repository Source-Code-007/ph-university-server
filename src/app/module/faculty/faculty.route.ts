import { Router } from 'express'
import { facultyControllers } from './faculty.controller'
import auth from '../../middleware/auth'
import { USER_ROLE } from '../user/user.constant'

const router = Router()

router.get('/', auth(USER_ROLE.ADMIN), facultyControllers.getAllFaculty)
router.get('/:id', auth(USER_ROLE.ADMIN), facultyControllers.getFacultyById)
router.delete(
  '/:id',
  auth(USER_ROLE.ADMIN),
  facultyControllers.deleteFacultyById,
)
router.patch(
  '/:id',
  auth(USER_ROLE.ADMIN),
  facultyControllers.updateFacultyById,
)

export { router as facultyRouter }

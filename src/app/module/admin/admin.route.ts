import { Router } from 'express'
import { adminControllers } from './admin.controller'
import auth from '../../middleware/auth'
import { USER_ROLE } from '../user/user.constant'

const router = Router()

router.get('/', auth(USER_ROLE.ADMIN), adminControllers.getAllAdmin)
router.get('/:id', auth(USER_ROLE.ADMIN), adminControllers.getAdminById)
router.delete('/:id', auth(USER_ROLE.ADMIN), adminControllers.deleteAdminById)
router.patch('/:id', auth(USER_ROLE.ADMIN), adminControllers.updateAdminById)

export { router as adminRouter }

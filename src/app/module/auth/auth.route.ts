import { Router } from 'express'
import { authControllers } from './auth.controller'
import zodValidateHandler from '../../middleware/zodValidateHandler'
import { authZodSchema } from './auth.validate'
import auth from '../../middleware/auth'
import { USER_ROLE } from '../user/user.constant'

const router = Router()

router.post(
  '/login',
  zodValidateHandler(authZodSchema.signinZodSchema),
  authControllers.login,
)
router.post('/refresh-token', authControllers.refreshToken)
router.post(
  '/forget-password',
  zodValidateHandler(authZodSchema.forgetPasswordZodSchema),
  authControllers.forgetPassword,
)
router.post('/reset-password', authControllers.resetPassword)
router.patch(
  '/change-password/:id',
  zodValidateHandler(authZodSchema.changePasswordZodSchema),
  auth(USER_ROLE.FACULTY, USER_ROLE.STUDENT),
)

export { router as authRouter }

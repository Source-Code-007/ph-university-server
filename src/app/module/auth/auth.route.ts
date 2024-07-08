import { Router } from 'express'
import { authControllers } from './auth.controller'
import zodValidateHandler from '../../middleware/zodValidateHandler'
import { authZodSchema } from './auth.validate'

const router = Router()

router.post('/login', zodValidateHandler(authZodSchema), authControllers.login)
router.post('/forget-password')
router.post('/refresh-token')


export {router as authRouter}
import { Router } from 'express'
import {
  deleteAllUsersController,
  deleteUserByIdController,
  getAllUsersController,
  getUserByIdController,
  insertUserController,
  toggleUserStatusController,
  updateUserByIdController,
} from './user.controller'
import zodValidateHandler from '../../middleware/zodValidateHandler'
import { userZodSchema } from './user.validate'

const router = Router()

router.post('/', zodValidateHandler(userZodSchema), insertUserController)
router.get('/', getAllUsersController)
router.get('/:id', getUserByIdController)
router.delete('/', deleteAllUsersController)
router.delete('/:id', deleteUserByIdController)
router.patch('/:id', updateUserByIdController)
router.patch('/status/:id', toggleUserStatusController)

export { router as userRouter }

import { Router } from 'express'
import zodValidateHandler from '../../middleware/zodValidateHandler'
import { createAcademicInfoZodSchema } from './academicInfo.validate.ts'



const router = Router()

router.post('/', zodValidateHandler(createAcademicInfoZodSchema), insertUserController)
router.get('/', getAllUsersController)
router.get('/:id', getUserByIdController)
router.delete('/', deleteAllUsersController)
router.delete('/:id', deleteUserByIdController)
router.patch('/:id', updateUserByIdController)
router.patch('/status/:id', toggleUserStatusController)

export { router as academicInfoRouter }
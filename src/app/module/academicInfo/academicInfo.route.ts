import { Router } from 'express'
import zodValidateHandler from '../../middleware/zodValidateHandler'
import { createAcademicInfoZodSchema } from './academicInfo.validate.ts'
import { deleteAcademicInfoByIdController, deleteAllAcademicInfoController, getAcademicInfoByIdController, getAllAcademicInfoController, insertAcademicInfoController, updateAcademicInfoByIdController } from './academicInfo.controller'



const router = Router()

router.post('/', zodValidateHandler(createAcademicInfoZodSchema), insertAcademicInfoController)
router.get('/', getAllAcademicInfoController)
router.get('/:id', getAcademicInfoByIdController)
router.delete('/', deleteAllAcademicInfoController)
router.delete('/:id', deleteAcademicInfoByIdController)
router.patch('/:id', updateAcademicInfoByIdController)

export { router as academicInfoRouter }
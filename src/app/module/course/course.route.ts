import { Router } from 'express'
import zodValidateHandler from '../../middleware/zodValidateHandler'
import { createCourseZodSchema, updateCourseZodSchema } from './course.validate'
import { courseController } from './course.controller'

const router = Router()

router.post(
  '/',
  zodValidateHandler(createCourseZodSchema),
  courseController.insertCourse,
)

router.put('/:courseId/assign-faculties', ) //TODO: Implement this route

router.get('/', courseController.getAllCourse)
router.get('/:id', courseController.getSingleCourseById)
router.delete('/:id', courseController.deleteCourseById)
router.patch(
  '/:id',
  zodValidateHandler(updateCourseZodSchema),
  courseController.updateCourseById,
)

export { router as courseRouter }

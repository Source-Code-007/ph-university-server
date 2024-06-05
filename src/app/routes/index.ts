import { Router } from 'express'
import { studentRouter } from '../module/student/student.route'
import { userRouter } from '../module/user/user.route'
import { academicInfoRouter } from '../module/academicInfo/academicInfo.route'
import { academicDepartmentRouter } from '../module/academicDepartment/academicDepartment.route'
import { academicFacultyRouter } from '../module/academicFaculty/academicFaculty.route'
import { batchRouter } from '../module/batch/batch.route'

const router = Router()
const routes = [
  {
    path: '/students',
    route: studentRouter,
  },
  {
    path: '/users',
    route: userRouter,
  },
  {
    path: '/academic-info',
    route: academicInfoRouter,
  },
  {
    path: '/academic-faculty',
    route: academicFacultyRouter,
  },
  {
    path: '/academic-department',
    route: academicDepartmentRouter,
  },
  {
    path: '/academic-department',
    route: academicDepartmentRouter,
  },
  {
    path: '/batch',
    route: batchRouter,
  },
]

routes.forEach((route) => router.use(route.path, route.route))

export default router

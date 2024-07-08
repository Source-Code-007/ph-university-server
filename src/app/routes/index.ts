import { Router } from 'express'
import { studentRouter } from '../module/student/student.route'
import { userRouter } from '../module/user/user.route'
import { academicDepartmentRouter } from '../module/academicDepartment/academicDepartment.route'
import { academicFacultyRouter } from '../module/academicFaculty/academicFaculty.route'
import { batchRouter } from '../module/batch/batch.route'
import { facultyRouter } from '../module/faculty/faculty.route'
import { adminRouter } from '../module/admin/admin.route'
import { courseRouter } from '../module/course/course.route'
import { authRouter } from '../module/auth/auth.route'

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
    path: '/faculties',
    route: facultyRouter,
  },
  {
    path: '/admins',
    route: adminRouter,
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
  {
    path: '/course',
    route: courseRouter,
  },
  {
    path: '/auth',
    route: authRouter,
  },
]

routes.forEach((route) => router.use(route.path, route.route))

export default router

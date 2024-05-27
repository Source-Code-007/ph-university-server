import { Router } from 'express'
import { studentRouter } from '../module/student/student.route'
import { userRouter } from '../module/user/user.route'

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
]

routes.forEach((route) => router.use(route.path, route.route))

export default router

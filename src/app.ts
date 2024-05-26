import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { studentRouter } from './app/module/student/student.route'
import { userRoute } from './app/module/user/user.route'

const app = express()

// parser
app.use(cors())
app.use(express.json())

// Router
app.use('/api/v1/students', studentRouter)
app.use('/api/v1/users', userRoute)

export default app

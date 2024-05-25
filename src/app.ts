import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { studentRouter } from './app/module/student/student.route'

const app = express()

// parser
app.use(cors())
app.use(express.json())

// Router
app.use('/api/v1/student', studentRouter)

export default app

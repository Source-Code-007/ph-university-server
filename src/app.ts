import express from 'express'
import cors from 'cors'
import 'dotenv/config'

const app = express()

// parser
app.use(cors())
app.use(express.json())

// Router

export default app

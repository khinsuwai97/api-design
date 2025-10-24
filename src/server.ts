import express from 'express'
import authRoutes from './routes/authRoutes.ts'
import habitRoutes from './routes/habitRoutes.ts'
import userRoutes from './routes/userRoutes.ts'

const app = express()

app.use('/api/habits', habitRoutes)
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)

export { app }

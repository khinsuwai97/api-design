import express from 'express'

const app = express()

app.get('/health', (req, res) => {
  res.json({ message: 'health' }).status(200)
})

export { app }

import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.json({ message: 'Get all habits' })
})

router.post('/', (req, res) => {
  res.json({ message: 'Habit created' }).status(201)
})

router.delete('/:id', (req, res) => {
  res.json({ message: 'Habit deleted' })
})

router.post('/:id/complete', (req, res) => {
  res.json({ message: `Mark habit ${req.params.id} complete` })
})

export default router

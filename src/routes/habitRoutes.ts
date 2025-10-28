import { Router } from 'express'
import { validateBody, validateParams } from '../middleware/validation.ts'
import { z } from 'zod'

const createHabitSchema = z.object({
  name: z.string(),
})

const completeParmasSchema = z.object({
  id: z.string().max(3),
})

const router = Router()

router.get('/', (req, res) => {
  res.json({ message: 'Get all habits' })
})

router.post('/', validateBody(createHabitSchema), (req, res) => {
  res.json({ message: 'Habit created' }).status(201)
})

router.delete('/:id', (req, res) => {
  res.json({ message: 'Habit deleted' })
})

router.post(
  '/:id/complete',
  validateParams(completeParmasSchema),
  validateBody(createHabitSchema),
  (req, res) => {
    res.json({ message: `Mark habit ${req.params.id} complete` })
  }
)

export default router

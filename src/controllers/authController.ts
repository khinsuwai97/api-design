import type { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import db from '../db/connection.ts'
import { users, type NewUser, type User } from '../db/schema.ts'
import { generateToken } from '../utils/jwt.ts'
import { hashPassword } from '../utils/password.ts'
import { createDeflate } from 'zlib'
import { a } from 'vitest/dist/chunks/suite.d.FvehnV49.js'

export const registerUser = async (
  req: Request<any, NewUser>,
  res: Response
) => {
  try {
    const { password } = req.body
    const hashedPassword = await hashPassword(password)
    const [user] = await db
      .insert(users)
      .values({
        ...req.body,
        password: hashedPassword,
      })
      .returning({
        id: users.id,
        email: users.email,
        username: users.username,
        firstName: users.firstName,
        lastName: users.lastName,
        createdAt: users.createdAt,
      })

    const token = await generateToken({
      id: user.id,
      email: user.email,
      username: user.username,
    })

    res.status(201).json({ message: 'User created successfully', user, token })
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({ message: 'Failed to create user' })
  }
}

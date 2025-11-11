import { db } from './connection.ts'
import { users, habitTags, habits, entries, tags } from './schema.ts'

import { fileURLToPath, pathToFileURL } from 'url'

async function seed() {
  console.log('start seeding...')
  try {
    console.log('Clearing existing data...')
    await db.delete(entries)
    await db.delete(habitTags)
    await db.delete(habits)
    await db.delete(tags)
    await db.delete(users)
    console.log('Creating demo user...')
    const [demoUser] = await db
      .insert(users)
      .values({
        email: 'demo@habitracker.com',
        username: 'demouser',
        password: 'password',
        firstName: 'Demo',
        lastName: 'User',
      })
      .returning()

    console.log('Creating tags...')
    const [healthTag] = await db
      .insert(tags)
      .values({ name: 'Health', color: '#10B981' })
      .returning()
    const [productivityTag] = await db
      .insert(tags)
      .values({ name: 'Productivity', color: '#3B82F6' })
      .returning()

    console.log('Creating demo habits...')
    const [exericseHabit] = await db
      .insert(habits)
      .values({
        userId: demoUser.id,
        name: 'Exercise',
        description: 'Daily workout routine',
        frequency: 'daily',
        targetCount: 1,
      })
      .returning()
    await db
      .insert(habitTags)
      .values([{ habitId: exericseHabit.id, tagId: healthTag.id }])

    console.log('Adding completion entries...')
    const today = new Date()
    today.setHours(12, 0, 0, 0) // Normalize to midnight

    for (let i = 1; i <= 7; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() - i)
      await db.insert(entries).values({
        habitId: exericseHabit.id,
        completion_date: date,
        note: i === 1 ? 'Great workdout today!' : null,
      })
    }
    console.log('✅ Database seeded successfully!')
    console.log('user credentials:')
    console.log(`email:${demoUser.email}`)
    console.log(`username:${demoUser.username}`)
    console.log(`password:${demoUser.password}`)
  } catch (error) {
    console.error('❌ Seed failed:', error)
    process.exit(1)
  }
}
//  Run seed if this file is executed directly
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  seed()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}

export default seed

import { base, de, de_AT, en, Faker } from '@faker-js/faker'
import { hashPassword } from 'better-auth/crypto'
import type { Insertable, Kysely } from 'kysely'
import nodemailer from 'nodemailer'
import { Pool } from 'pg'
import { DB } from '@/db/types'
import { authFactory } from '@/lib/auth'

// replace `any` with your database interface.
export async function seed(db: Kysely<DB>): Promise<void> {
  const faker = new Faker({ locale: [de_AT, de, en, base] })

  const fakeUsers: Insertable<DB['user']>[] = Array.from({ length: 100 }).map(() => {
    const [firstName, lastName] = [faker.person.firstName(), faker.person.lastName()]
    return {
      email: faker.internet.email({ firstName, lastName }),
      emailVerified: false,
      name: `${firstName} ${lastName}`,
      image: faker.image.avatarGitHub(),
      id: crypto.randomUUID(),
      banned: false,
    }
  })

  const users = await db.insertInto('user').values(fakeUsers).returningAll().execute()

  const fakeAccounts: Insertable<DB['account']>[] = await Promise.all(
    users.map(async (user) => ({
      userId: user.id,
      password: await hashPassword('password123'),
      accountId: user.id,
      providerId: user.id,
      id: crypto.randomUUID(),
      updatedAt: new Date(),
    })),
  )

  const accounts = await db.insertInto('account').values(fakeAccounts).execute()
}

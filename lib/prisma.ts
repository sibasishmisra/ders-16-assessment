import { PrismaClient } from './generated/prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import { createClient } from '@libsql/client'

function createPrismaClient(): PrismaClient {
  const tursoUrl = process.env.TURSO_DATABASE_URL
  const tursoToken = process.env.TURSO_AUTH_TOKEN

  if (tursoUrl) {
    const libsql = createClient({ url: tursoUrl, authToken: tursoToken })
    const adapter = new PrismaLibSql(libsql)
    return new PrismaClient({ adapter })
  }

  const dbUrl = process.env.DATABASE_URL ?? 'file:./prisma/dev.db'
  const filePath = dbUrl.replace(/^file:/, '')
  const adapter = new PrismaBetterSqlite3({ url: filePath })
  return new PrismaClient({ adapter })
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

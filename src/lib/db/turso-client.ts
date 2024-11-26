import { createClient } from '@libsql/client'

const tursoClient = createClient({
  url: process.env.TURSO_DATABASE_URL as string,
  authToken: process.env.TURSO_AUTH_TOKEN
})

export { tursoClient }

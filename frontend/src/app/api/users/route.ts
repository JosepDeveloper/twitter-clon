import { tursoClient } from '@/lib/db/turso-client'
import { userSchema } from './schemas/user'

export async function GET (request: Request) {
  const { searchParams } = new URL(request.url)
  const usernameParamas = searchParams.get('username')

  const reponseSQL = await tursoClient.execute({
    sql: 'SELECT * FROM users WHERE username = (:username)',
    args: { username: usernameParamas }
  })

  if (reponseSQL.rows.length === 0) {
    return Response.json({ message: 'User not found' }, { status: 404 })
  }

  const { username, image_url: imageURL } = reponseSQL.rows[0]

  return Response.json({ message: 'User found', data: { username, imageURL } }, { status: 200 })
}

export async function POST (request: Request) {
  const body = await request.json()

  const userData = await userSchema.safeParseAsync(body)

  if (!userData.success) {
    return Response.json({ message: 'Invalid data' }, { status: 400 })
  }

  const { username, imageURL } = userData.data

  try {
    await tursoClient.execute({
      sql: 'INSERT INTO users (username, image_url) VALUES (:username, :imageURL)',
      args: { username, imageURL }
    })
  } catch {
    return Response.json({ message: 'Error inserting data' }, { status: 500 })
  }

  return Response.json({ message: 'User Created Sucessfully', data: { username, imageURL } }, { status: 200 })
}

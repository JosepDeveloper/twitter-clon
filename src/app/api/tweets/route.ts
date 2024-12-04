import { tursoClient } from '@/lib/db/turso-client'
import { z } from 'zod'

export async function GET () {
  const responseSQL = await tursoClient.execute(`
    SELECT 
      tweets.id, tweets.message, users.username, users.image_url 
    FROM 
      tweets
    JOIN 
      users ON tweets.user_id = users.id
    LIMIT 20 OFFSET 0;
  `)

  const tweets = responseSQL.rows.map((tweet) => ({
    id: tweet.id,
    textMarkdown: tweet.message,
    nickname: tweet.username,
    urlImage: tweet.image_url
  }))

  return Response.json({ message: 'Tweets found', data: tweets.reverse() })
}

const tweetsSchema = z.object({
  username: z.string(),
  message: z.string()
})

export async function POST (request: Request) {
  const body = await request.json()

  const data = await tweetsSchema.safeParseAsync(body)

  if (!data.success) {
    return Response.json({ message: 'Invalid data' }, { status: 400 })
  }

  const responseSQL = await tursoClient.execute({
    sql: 'SELECT * FROM users WHERE username = (:username)',
    args: { username: data.data.username }
  })

  if (responseSQL.rows.length === 0) {
    return Response.json({ message: 'User not found' }, { status: 404 })
  }

  const [user] = responseSQL.rows

  await tursoClient.execute({
    sql: 'INSERT INTO tweets(message, user_id) VALUES (:message, :id)',
    args: { message: data.data.message, id: user.id }
  })

  return Response.json({ message: 'Tweet Created Sucessfully' })
}

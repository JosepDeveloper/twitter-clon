import { z } from 'zod'

const userSchema = z.object({
  username: z.string(),
  imageURL: z.string().url()
})

export { userSchema }

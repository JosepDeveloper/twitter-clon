export type urlImage = `https://i.pravatar.cc/150?u=a${string}` | `https://avatars.githubusercontent.com/${string}`

interface TweestType {
  textMarkdown: string
  nickname: string
  urlImage: urlImage
}

export type { TweestType }

interface Comment {
  id: string
  tweetId: string
  content: string
  mediaUrl?: string | null
  mediaWidth?: number | null
  mediaHeight?: number | null
  createdAt: string
  liked: boolean
  user: {
    id: string
    name: string
    image: string | null
  }
  count: {
    likes: number
  }
}

export default Comment

import type Comment from 'types/comment'

interface Tweet {
  id: string
  content: string
  mediaUrl?: string | null
  mediaWidth?: number | null
  mediaHeight?: number | null
  canReply: boolean
  userId: string
  createdAt: string
  reTweeted: boolean
  liked: boolean
  bookmarked: boolean
  user: {
    id: string
    name: string
    image: string | null
  }
  count: {
    comments: number
    reTweets: number
    bookmarks: number
  }
  comments: Comment[]
}

export default Tweet

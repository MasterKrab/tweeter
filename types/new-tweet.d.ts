interface NewTweet {
  content: string
  media: File | null
  replyPermission: 'everyone' | 'following'
}

export default NewTweet

interface NewTweet {
  content: string
  media?: File
  replyPermission: 'everyone' | 'following'
}

export default NewTweet

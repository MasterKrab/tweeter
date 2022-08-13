export interface NewCommentForm {
  content: string
  media: File | null
}

export interface NewComment extends NewCommentForm {
  tweetId: string
}

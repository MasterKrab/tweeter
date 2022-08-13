export interface NewCommentForm {
  content: string
  media?: File
}

export interface NewComment extends NewCommentForm {
  tweetId: string
}

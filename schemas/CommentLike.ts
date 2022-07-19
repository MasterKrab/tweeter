import * as jf from 'joiful'

class CommentLike {
  @jf.string().trim().min(1).required()
  commentId!: string
}

export default CommentLike

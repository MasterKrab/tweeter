import * as jf from 'joiful'
import Files from 'schemas/Files'

class CreateTweet {
  @jf.string().trim().min(1).required()
  content!: string

  @jf.object()
  files!: Files

  @jf.string().valid(['everyone', 'following'])
  replyPermission!: 'everyone' | 'following'
}

export default CreateTweet

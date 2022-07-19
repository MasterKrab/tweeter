import * as jf from 'joiful'
import Files from 'schemas/Files'

class CreateComment {
  @jf.string().trim().min(1).required()
  content!: string

  @jf.object()
  files!: Files

  @jf.string().required()
  tweetId!: string
}

export default CreateComment

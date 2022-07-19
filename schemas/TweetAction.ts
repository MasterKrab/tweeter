import * as jf from 'joiful'
import { tweetActions } from 'lib/tweetActions'

class TweetAction {
  @jf.string().valid(tweetActions)
  action!: string

  @jf.string().required()
  tweetId!: string
}

export default TweetAction

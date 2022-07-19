import type Tweet from 'types/tweet'
import TWEET_ACTIONS from 'lib/tweetActions'

const getActionIsAlreadyDone = (tweet: Tweet, action: string) => {
  switch (action) {
    case TWEET_ACTIONS.RETWEET:
      return tweet.reTweeted
    case TWEET_ACTIONS.LIKE:
      return tweet.liked
    case TWEET_ACTIONS.BOOKMARK:
      return tweet.bookmarked
    default:
      return null
  }
}

export default getActionIsAlreadyDone

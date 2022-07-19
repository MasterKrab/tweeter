import type Tweet from 'types/tweet'
import TWEET_ACTIONS, { TweetAction } from 'lib/tweetActions'

const createMapTweetActions =
  (action: TweetAction, tweetId: string, newValue: boolean) =>
  (tweet: Tweet) => {
    if (tweet.id !== tweetId) return tweet

    const sum = newValue ? 1 : -1

    switch (action) {
      case TWEET_ACTIONS.RETWEET:
        return {
          ...tweet,
          reTweeted: newValue,
          count: {
            ...tweet.count,
            reTweets: tweet.count.reTweets + sum,
          },
        }
      case TWEET_ACTIONS.LIKE:
        return {
          ...tweet,
          liked: newValue,
        }

      case TWEET_ACTIONS.BOOKMARK:
        return {
          ...tweet,
          bookmarked: newValue,
          count: {
            ...tweet.count,
            bookmarks: tweet.count.bookmarks + sum,
          },
        }
    }
  }

export default createMapTweetActions

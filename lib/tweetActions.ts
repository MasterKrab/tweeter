const TWEET_ACTIONS: {
  RETWEET: 'retweet'
  LIKE: 'like'
  BOOKMARK: 'bookmark'
} = {
  RETWEET: 'retweet',
  LIKE: 'like',
  BOOKMARK: 'bookmark',
}

export type TweetAction = typeof TWEET_ACTIONS[keyof typeof TWEET_ACTIONS]

export const tweetActions: TweetAction[] = Object.values(TWEET_ACTIONS)

export default TWEET_ACTIONS

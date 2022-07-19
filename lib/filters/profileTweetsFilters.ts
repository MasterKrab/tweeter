const PROFILE_TWEETS_FILTERS = {
  TWEETS: 'tweets',
  TWEETS_AND_REPLIES: 'tweets-and-replies',
  MEDIA: 'media',
  LIKES: 'likes',
}

export type ProfileTweetFilter =
  typeof PROFILE_TWEETS_FILTERS[keyof typeof PROFILE_TWEETS_FILTERS]

export const profileTweetsFilters: ProfileTweetFilter[] = Object.values(
  PROFILE_TWEETS_FILTERS
)

export const PROFILE_TWEETS_TEXTS = {
  [PROFILE_TWEETS_FILTERS.TWEETS]: 'Tweets',
  [PROFILE_TWEETS_FILTERS.TWEETS_AND_REPLIES]: 'Tweets & Replies',
  [PROFILE_TWEETS_FILTERS.MEDIA]: 'Media',
  [PROFILE_TWEETS_FILTERS.LIKES]: 'Likes',
}

export default PROFILE_TWEETS_FILTERS

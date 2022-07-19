const BOOKMARKS_TWEETS_FILTERS = {
  TWEETS: 'tweets',
  MEDIA: 'media',
  LIKES: 'likes',
}

export type BookmarkTweetFilter =
  typeof BOOKMARKS_TWEETS_FILTERS[keyof typeof BOOKMARKS_TWEETS_FILTERS]

export const bookmarksTweetsFilter: BookmarkTweetFilter[] = Object.values(
  BOOKMARKS_TWEETS_FILTERS
)

export const BOOKMARKS_TWEETS_TEXTS = {
  [BOOKMARKS_TWEETS_FILTERS.TWEETS]: 'Tweets',
  [BOOKMARKS_TWEETS_FILTERS.MEDIA]: 'Media',
  [BOOKMARKS_TWEETS_FILTERS.LIKES]: 'Likes',
}

export default BOOKMARKS_TWEETS_FILTERS

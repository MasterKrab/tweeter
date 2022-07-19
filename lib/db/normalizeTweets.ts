import type { Tweet } from '@prisma/client'
import type NormalizedTweet from 'types/tweet'
import REPLY_PERMISSIONS from 'lib/replyPermissions'
import getIsFollowing from 'lib/db/getIsFollowing'
import getHasRetweeted from 'lib/db/getHasRetweeted'
import getHasLiked from 'lib/db/getHasLiked'
import getHasBookmarked from 'lib/db/getHasBookmarked'
import getHasLikedComment from 'lib/db/getHasLikedComment'

export type TweetToNormalize = Tweet & {
  user: {
    id: string
    name: string
    image: string | null
  }
  comments: {
    user: {
      id: string
      name: string
      image: string | null
    }
    _count: {
      likes: number
    }
    id: string
    createdAt: Date
    content: string
    mediaUrl: string | null
    mediaWidth: number | null
    mediaHeight: number | null
    tweetId: string
  }[]
  _count: {
    reTweets: number
    bookmarks: number
    comments: number
  }
}

export const normalizeTweets = (
  tweets: TweetToNormalize[],
  userId?: string,
  defaults?: {
    retTweeted?: boolean
    liked?: boolean
    bookmarked?: boolean
    likedComment?: boolean
  }
): Promise<NormalizedTweet[]> =>
  Promise.all(
    tweets.map(
      async ({
        id,
        user,
        createdAt,
        replyPermission,
        comments,
        _count,
        ...tweet
      }) => {
        const canReplyPromise =
          replyPermission === REPLY_PERMISSIONS.EVERYONE
            ? true
            : !!userId &&
              (userId === user.id ? true : getIsFollowing(userId, user.id))

        const reTweetedPromise =
          defaults?.retTweeted || userId ? getHasRetweeted(userId!, id) : false

        const likedPromise =
          defaults?.liked || userId ? getHasLiked(userId!, id) : false

        const bookmarkedPromise =
          defaults?.bookmarked || userId ? getHasBookmarked(userId!, id) : false

        const commentsPromise = Promise.all(
          comments.map(async ({ id, createdAt, _count, ...comment }) => {
            const liked =
              defaults?.likedComment || userId
                ? await getHasLikedComment(userId!, id)
                : false

            return {
              ...comment,
              id,
              liked,
              createdAt: createdAt.toISOString(),
              count: _count,
            }
          })
        )

        const [canReply, reTweeted, liked, bookmarked, normalizedComments] =
          await Promise.all([
            canReplyPromise,
            reTweetedPromise,
            likedPromise,
            bookmarkedPromise,
            commentsPromise,
          ])

        return {
          ...tweet,
          id,
          user,
          canReply,
          reTweeted,
          liked,
          bookmarked,
          comments: normalizedComments,
          createdAt: createdAt.toISOString(),
          count: _count,
        }
      }
    )
  )

export default normalizeTweets

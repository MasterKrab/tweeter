import type Tweet from 'types/tweet'

const createMapTweetsCommentLike =
  (tweetId: string, commentId: string, newValue: boolean) => (tweet: Tweet) => {
    if (tweet.id !== tweetId) return tweet

    const sum = newValue ? 1 : -1

    const { comments } = tweet

    return {
      ...tweet,
      comments: comments.map((comment) => {
        if (comment.id !== commentId) return comment

        const { count } = comment

        return {
          ...comment,
          liked: newValue,
          count: {
            ...count,
            likes: count.likes + sum,
          },
        }
      }),
    }
  }

export default createMapTweetsCommentLike

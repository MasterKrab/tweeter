import type { tweetId } from 'reducers/tweetsSlice'
import axios from 'axios'
import handleAxiosError from 'utils/handleAxiosError'

interface CommentInfo {
  id: tweetId
  tweetId: string
  commentId: string
}

export const createCommentLike = async ({
  id,
  tweetId,
  commentId,
}: CommentInfo) => {
  try {
    await axios.post('/api/comment-like', {
      commentId,
    })

    return { id, tweetId, commentId }
  } catch (error) {
    return handleAxiosError(error)
  }
}

export const deleteCommentLike = async ({
  id,
  tweetId,
  commentId,
}: CommentInfo) => {
  try {
    await axios.delete('/api/comment-like', {
      data: { commentId },
    })

    return { id, tweetId, commentId }
  } catch (error) {
    return handleAxiosError(error)
  }
}

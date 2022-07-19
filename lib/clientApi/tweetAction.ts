import type { TweetAction } from 'lib/tweetActions'
import type { tweetId } from 'reducers/tweetsSlice'
import axios from 'axios'
import handleAxiosError from 'utils/handleAxiosError'

interface TweetActionInfo {
  action: TweetAction
  tweetId: string
  id: tweetId
}

export const createTweetAction = async ({
  id,
  action,
  tweetId,
}: TweetActionInfo) => {
  try {
    await axios.post('/api/tweet-action', {
      action,
      tweetId,
    })

    return { id, action, tweetId }
  } catch (error) {
    return handleAxiosError(error)
  }
}

export const deleteTweetAction = async ({
  id,
  action,
  tweetId,
}: TweetActionInfo) => {
  try {
    await axios.delete('/api/tweet-action', {
      data: {
        action,
        tweetId,
      },
    })

    return { action, tweetId, id }
  } catch (error) {
    return handleAxiosError(error)
  }
}

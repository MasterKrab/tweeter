import type NewTweet from 'types/new-tweet'
import type Tweet from 'types/tweet'
import type { tweetId } from 'reducers/tweetsSlice'
import axios from 'axios'
import toFormData from 'utils/toFormData'
import handleAxiosError from 'utils/handleAxiosError'

const createTweet = async ({ id, data }: { id: tweetId; data: NewTweet }) => {
  try {
    const response = await axios.post<Tweet>('/api/tweet', toFormData(data))

    return { id, tweet: response.data }
  } catch (error) {
    return handleAxiosError(error)
  }
}

export default createTweet

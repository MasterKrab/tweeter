import type Tweet from 'types/tweet'
import type { tweetId } from 'reducers/tweetsSlice'
import axios from 'axios'

const getTweets = async ({
  reset,
  id,
  ...params
}: {
  take?: number
  skip?: number
  reset?: boolean
  id: tweetId
}) => {
  const { data } = await axios.get<Tweet[]>('/api/tweets/normal', { params })

  return {
    tweets: data,
    reset,
    id,
  }
}

export default getTweets

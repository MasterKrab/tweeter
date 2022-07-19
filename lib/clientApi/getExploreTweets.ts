import type Tweet from 'types/tweet'
import type { tweetId } from 'reducers/tweetsSlice'
import axios from 'axios'

const getExploreTweets = async ({
  reset,
  id,
  ...params
}: {
  userId?: string
  take: number
  skip?: number
  media?: boolean
  search?: string
  orderByReTweetsCount?: boolean
  orderByLikesCount?: boolean
  reset?: boolean
  id: tweetId
}) => {
  const { data } = await axios.get<Tweet[]>('/api/tweets/explore', { params })

  return {
    tweets: data,
    reset,
    id,
  }
}

export default getExploreTweets

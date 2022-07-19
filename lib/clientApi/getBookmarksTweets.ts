import type Tweet from 'types/tweet'
import type { tweetId } from 'reducers/tweetsSlice'
import axios from 'axios'

const getBookmarksTweets = async ({
  reset,
  id,
  ...params
}: {
  userId?: string
  take: number
  skip?: number
  media?: boolean
  likes?: boolean
  reset?: boolean
  id: tweetId
}) => {
  const { data } = await axios.get<Tweet[]>('/api/tweets/bookmarks', { params })

  return {
    tweets: data,
    reset,
    id,
  }
}

export default getBookmarksTweets

import type Tweet from 'types/tweet'
import type { tweetId } from 'reducers/tweetsSlice'
import axios from 'axios'

const getProfileTweets = async ({
  reset,
  id,
  ...params
}: {
  take: number
  userId?: string
  skip?: number
  media?: boolean
  profileId?: string
  profileRetweets?: boolean
  profileTweets?: boolean
  profileReplies?: boolean
  profileLikes?: boolean
  reset?: boolean
  id: tweetId
}) => {
  const { data } = await axios.get<Tweet[]>('/api/tweets/profile', { params })

  return {
    tweets: data,
    reset,
    id,
  }
}

export default getProfileTweets

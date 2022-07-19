import type { NextApiRequest, NextApiResponse } from 'next'
import type Tweet from 'types/tweet'
import { getSession } from 'next-auth/react'
import isSomeArray from 'utils/isSomeArray'
import convertToNumbers from 'utils/convertToNumbers'
import getProfileTweets from 'lib/db/getProfileTweets'

export default async (
  req: NextApiRequest,
  res: NextApiResponse<Tweet[] | string>
) => {
  if (req.method !== 'GET') return res.status(405).end('Method not allowed')

  const session = await getSession({ req })

  const userId = session?.user?.id

  const {
    take = '10',
    skip = '0',
    media = false,
    profileId,
    profileRetweets = false,
    profileTweets = false,
    profileReplies = false,
    profileLikes = false,
  } = req.query

  if (
    isSomeArray(
      take,
      skip,
      media,
      profileId,
      profileRetweets,
      profileTweets,
      profileReplies,
      profileLikes
    ) ||
    !profileId
  )
    return res.status(400).send('Invalid query')

  const { result, error } = convertToNumbers(take as string, skip as string)

  if (error) return res.status(400).send('Invalid query')

  const [normalizedTake, normalizedSkip] = result!

  const tweets = await getProfileTweets({
    userId,
    take: normalizedTake,
    skip: normalizedSkip,
    profileId: profileId as string,
    media: media === 'true',
    profileRetweets: profileRetweets === 'true',
    profileTweets: profileTweets === 'true',
    profileReplies: profileReplies === 'true',
    profileLikes: profileLikes === 'true',
  })

  res.status(200).json(tweets)
}

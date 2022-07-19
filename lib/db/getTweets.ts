import type { Prisma } from '@prisma/client'
import prisma from 'lib/db/prisma'
import tweetsQuery from 'lib/db/tweetsQuery'
import normalizeTweets from 'lib/db/normalizeTweets'

const getTweets = async ({
  take,
  userId,
  skip = 0,
}: {
  take: number
  userId?: string
  skip?: number
}) => {
  const where: Prisma.TweetWhereInput = {}

  const tweets = await prisma.tweet.findMany({
    take,
    skip,
    where,
    ...tweetsQuery,
    orderBy: {
      createdAt: 'desc',
    },
  })

  return await normalizeTweets(tweets, userId)
}

export default getTweets

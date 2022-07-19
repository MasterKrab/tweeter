import type { Prisma } from '@prisma/client'
import prisma from 'lib/db/prisma'
import tweetsQuery from 'lib/db/tweetsQuery'
import normalizeTweets from 'lib/db/normalizeTweets'

const getTweets = async ({
  take,
  userId,
  skip = 0,
  media,
  profileId,
  profileRetweets,
  profileTweets,
  profileReplies,
  profileLikes,
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
}) => {
  const where: Prisma.TweetWhereInput = {}

  if (media) {
    where.mediaUrl = {
      not: null,
    }
    where.mediaWidth = {
      not: null,
    }
    where.mediaHeight = {
      not: null,
    }
  }

  const conditions: Prisma.Enumerable<Prisma.TweetWhereInput> = []

  if (profileTweets) {
    conditions.push({
      userId: profileId,
    })
  }

  if (profileRetweets) {
    conditions.push({
      reTweets: {
        some: {
          userId: profileId,
        },
      },
    })
  }

  if (profileReplies) {
    conditions.push({
      comments: {
        some: {
          userId: profileId,
        },
      },
    })
  }

  if (profileLikes) {
    conditions.push({
      likes: {
        some: {
          userId: profileId,
        },
      },
    })
  }

  if (conditions.length) where.OR = conditions

  const tweets = await prisma.tweet.findMany({
    take,
    skip,
    where,
    ...tweetsQuery,
  })

  return await normalizeTweets(tweets, userId)
}

export default getTweets

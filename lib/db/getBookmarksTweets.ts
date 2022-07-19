import type { Prisma } from '@prisma/client'
import prisma from 'lib/db/prisma'
import tweetsQuery from 'lib/db/tweetsQuery'
import normalizeTweets from 'lib/db/normalizeTweets'

const getBookmarksTweets = async ({
  userId,
  take,
  skip = 0,
  media,
  likes,
}: {
  take: number
  userId: string
  skip?: number
  media?: boolean
  likes?: boolean
}) => {
  const where: Prisma.TweetWhereInput = {
    bookmarks: {
      some: {
        userId,
      },
    },
  }

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

  if (likes) {
    where.likes = {
      some: {
        userId,
      },
    }
  }

  const tweets = await prisma.tweet.findMany({
    take,
    skip,
    where,
    ...tweetsQuery,
  })

  return await normalizeTweets(tweets, userId, {
    bookmarked: true,
    liked: likes,
  })
}

export default getBookmarksTweets

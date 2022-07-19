import type { Prisma } from '@prisma/client'
import prisma from 'lib/db/prisma'
import tweetsQuery from 'lib/db/tweetsQuery'
import normalizeTweets from 'lib/db/normalizeTweets'
import Fuse from 'fuse.js'

const options = {
  keys: ['content', 'comments.content'],
}

const getTweets = async ({
  userId,
  take,
  skip = 0,
  media,
  search,
  orderByReTweetsCount,
  orderByLikesCount,
}: {
  userId?: string
  take: number
  skip?: number
  media?: boolean
  search?: string
  orderByReTweetsCount?: boolean
  orderByLikesCount?: boolean
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

  const orderBy: Prisma.Enumerable<Prisma.TweetOrderByWithRelationInput> = []

  orderByReTweetsCount && orderBy.push({ reTweets: { _count: 'desc' } })
  orderByLikesCount && orderBy.push({ likes: { _count: 'desc' } })
  orderBy.push({ createdAt: 'desc' })

  const hasSearch = !!search?.trim()

  const tweets = await prisma.tweet.findMany({
    take: hasSearch ? undefined : take,
    skip: hasSearch ? undefined : skip,
    include: {
      ...tweetsQuery.include,
      _count: {
        select: {
          ...tweetsQuery.include._count.select,
          likes: orderByLikesCount,
        },
      },
    },
    where,
    orderBy,
    distinct: ['id'],
  })

  if (!hasSearch) return await normalizeTweets(tweets, userId)

  const fuse = new Fuse(tweets, options)

  const filteredTweets = fuse
    .search(search!)
    .map(({ item }) => item)
    .slice(skip, skip + take)

  return await normalizeTweets(filteredTweets, userId)
}

export default getTweets

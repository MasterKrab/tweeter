import type { Prisma } from '@prisma/client'
import prisma from 'lib/db/prisma'
import tweetsQuery from 'lib/db/tweetsQuery'
import normalizeTweets from 'lib/db/normalizeTweets'
import Fuse from 'fuse.js'

const options = {
  keys: ['content', 'comments.content'],
}

const getTweets = async ({
  take,
  skip = 0,
  media,
  search,
  orderByReTweetsCount,
  orderByLikesCount,
}: {
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
    where,
    orderBy,
    ...tweetsQuery,
    distinct: ['id'],
  })

  if (!hasSearch) return await normalizeTweets(tweets)

  const fuse = new Fuse(tweets, options)

  const filteredTweets = fuse
    .search(search!)
    .map(({ item }) => item)
    .slice(skip, skip + take)

  return await normalizeTweets(filteredTweets)
}

export default getTweets

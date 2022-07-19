import prisma from 'lib/db/prisma'
import crypto from 'crypto'

const getHashtags = async (take: number) => {
  const hashtags = await prisma.hashtag.groupBy({
    by: ['name'],
    _count: {
      tweetId: true,
    },
    take,
    orderBy: {
      _count: {
        tweetId: 'desc',
      },
    },
  })

  const normalizedHashtags = hashtags.map(({ name, _count: { tweetId } }) => ({
    id: crypto.randomUUID(),
    name,
    tweetsCount: tweetId,
  }))

  return normalizedHashtags
}

export default getHashtags

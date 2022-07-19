import prisma from 'lib/db/prisma'

const getHasLiked = async (userId: string, tweetId: string) => {
  const like = await prisma.like.findUnique({
    where: {
      userId_tweetId: {
        userId,
        tweetId,
      },
    },
  })

  return !!like
}

export default getHasLiked

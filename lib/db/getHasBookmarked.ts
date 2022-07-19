import prisma from 'lib/db/prisma'

const getHasBookmarked = async (userId: string, tweetId: string) => {
  const bookmark = await prisma.bookmark.findUnique({
    where: {
      userId_tweetId: {
        userId,
        tweetId,
      },
    },
  })

  return !!bookmark
}

export default getHasBookmarked

import prisma from 'lib/db/prisma'

const getHasRetweeted = async (userId: string, tweetId: string) => {
  const retweet = await prisma.reTweet.findUnique({
    where: {
      userId_tweetId: {
        userId,
        tweetId,
      },
    },
  })

  return !!retweet
}

export default getHasRetweeted

import prisma from 'lib/db/prisma'

const getIsFollowed = async (followerId: string, followedId: string) => {
  const follower = await prisma.follower.findFirst({
    where: {
      followerId,
      followedId,
    },
  })

  return !!follower
}

export default getIsFollowed

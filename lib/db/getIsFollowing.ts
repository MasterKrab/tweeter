import prisma from 'lib/db/prisma'

const getIsFollowing = async (followerId: string, followedId: string) => {
  const follower = await prisma.follower.findUnique({
    where: {
      followerId_followedId: {
        followerId,
        followedId,
      },
    },
  })

  return !!follower
}

export default getIsFollowing

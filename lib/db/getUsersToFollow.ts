import prisma from 'lib/db/prisma'

const getUsersToFollow = async (take: number, userId?: string) => {
  const where = userId
    ? {
        id: {
          not: userId,
        },
        followers: {
          every: {
            follower: {
              id: {
                not: userId,
              },
            },
          },
        },
      }
    : undefined

  const users = await prisma.user.findMany({
    where,
    select: {
      id: true,
      name: true,
      image: true,
      bio: true,
      cover: true,
      followers: {
        select: {
          id: true,
        },
      },
      _count: {
        select: {
          followers: true,
        },
      },
    },
    take,
  })

  const normalizedUsers = users.map(({ followers, _count, ...user }) => ({
    ...user,
    isFollowed: userId ? followers.some(({ id }) => id === userId) : false,
    followersCount: _count.followers,
  }))

  return normalizedUsers
}

export default getUsersToFollow

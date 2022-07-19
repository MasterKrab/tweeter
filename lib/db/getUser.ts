import prisma from 'lib/db/prisma'
import getIsFollowing from 'lib/db/getIsFollowing'

const getUser = async (id: string, userId?: string) => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      image: true,
      bio: true,
      cover: true,
      following: {
        select: {
          followed: {
            select: {
              id: true,
              name: true,
              image: true,
              bio: true,
              _count: {
                select: {
                  followers: true,
                },
              },
            },
          },
        },
      },
      followers: {
        select: {
          followerId: true,
        },
      },
      _count: {
        select: {
          followers: true,
          following: true,
        },
      },
    },
  })

  if (!result) return null

  const { _count, following, ...user } = result

  const normalizedUser = {
    ...user,
    following: await Promise.all(
      following.map(async (data) => {
        const { _count, ...user } = data.followed!

        const isFollowed = userId
          ? await getIsFollowing(userId, user.id)
          : false

        return {
          ...user,
          isFollowed,
          count: _count,
        }
      })
    ),
    count: _count,
  }

  return normalizedUser
}

export default getUser

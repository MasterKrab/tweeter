import prisma from 'lib/db/prisma'
import Fuse from 'fuse.js'

const options = {
  keys: ['name', 'bio'],
}

const getUsers = async ({
  take,
  skip = 0,
  search,
}: {
  take: number
  skip: number
  search?: string
}) => {
  const users = await prisma.user.findMany({
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
    skip,
  })

  const normalizedUsers = users.map(({ followers, _count, ...user }) => ({
    ...user,
    followersCount: _count.followers,
  }))

  if (!search?.trim()) return normalizedUsers

  const fuse = new Fuse(normalizedUsers, options)

  const filteredUsers = fuse.search(search).map(({ item }) => item)

  return filteredUsers
}

export default getUsers

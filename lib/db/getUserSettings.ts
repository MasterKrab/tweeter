import prisma from 'lib/db/prisma'

const getUserSettings = (id: string) => {
  const user = prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      image: true,
      cover: true,
      bio: true,
    },
  })

  return user
}

export default getUserSettings

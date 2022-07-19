import prisma from 'lib/db/prisma'

const getHasLikedComment = async (userId: string, commentId: string) => {
  const like = await prisma.commentLike.findUnique({
    where: {
      userId_commentId: {
        userId,
        commentId,
      },
    },
  })

  return !!like
}

export default getHasLikedComment

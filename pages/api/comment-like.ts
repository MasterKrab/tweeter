import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import * as jf from 'joiful'
import prisma from 'lib/db/prisma'
import CommentLike from 'schemas/CommentLike'

export default async (req: NextApiRequest, res: NextApiResponse<string>) => {
  if (req.method !== 'POST' && req.method !== 'DELETE')
    return res.status(405).end('Method not allowed')

  const session = await getSession({ req })

  if (!session) return res.status(401).send("You're not logged in")

  if (req.method === 'POST') {
    const { error, value } = jf.validateAsClass(req.body, CommentLike)

    if (error) return res.status(400).send(error.message)

    const { commentId } = value

    const data = {
      commentId,
      userId: session!.user.id,
    }

    try {
      const like = await prisma.commentLike.findFirst({
        where: data,
      })

      if (like) return res.status(400).send('Like already created')

      await prisma.commentLike.create({
        data,
      })

      res.status(201).end()
    } catch (error) {
      console.error(error)
      res.status(500).send('Internal server error')
    }
    return
  }

  const { error, value } = jf.validateAsClass<any, CommentLike>(
    req.body,
    CommentLike
  )

  if (error) return res.status(400).send(error.message)

  const { commentId } = value

  try {
    await prisma.commentLike.deleteMany({
      where: {
        commentId,
        userId: session!.user.id,
      },
    })

    res.status(204).end()
  } catch (error) {
    console.log(error)
    res.status(500).send('Internal server error')
  }
}

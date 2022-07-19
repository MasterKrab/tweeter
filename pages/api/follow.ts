import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import * as jf from 'joiful'
import prisma from 'lib/db/prisma'
import CreateFollow from 'schemas/CreateFollow'

export default async (req: NextApiRequest, res: NextApiResponse<string>) => {
  if (req.method !== 'POST' && req.method !== 'DELETE')
    return res.status(405).end('Method not allowed')

  const session = await getSession({ req })

  if (!session) return res.status(401).send("You're not logged in")

  const { error, value } = jf.validateAsClass(req.body, CreateFollow)

  if (error) return res.status(400).send(error.message)

  const followerId = session.user.id!
  const followedId = value.userId

  if (req.method === 'POST') {
    try {
      const follower = await prisma.follower.findFirst({
        where: {
          followerId,
          followedId,
        },
      })

      if (follower) return res.status(400).send('You already follow this user')

      await prisma.follower.create({
        data: {
          followerId,
          followedId,
        },
      })

      res.status(201).end()
    } catch (error) {
      console.error(error)
      res.status(500).send('Internal server error')
    }
    return
  }

  try {
    await prisma.follower.deleteMany({
      where: {
        followerId,
        followedId,
      },
    })

    res.status(200).end()
  } catch (error) {
    console.log(error)
    res.status(500).send('Internal server error')
  }
}

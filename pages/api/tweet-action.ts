import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import * as jf from 'joiful'
import prisma from 'lib/db/prisma'
import TweetAction from 'schemas/TweetAction'
import TWEET_ACTIONS from 'lib/tweetActions'

const ERROR_ACTION_ALREADY_CREATED = 'Action already created'

export default async (req: NextApiRequest, res: NextApiResponse<string>) => {
  if (req.method !== 'POST' && req.method !== 'DELETE')
    return res.status(405).end('Method not allowed')

  const session = await getSession({ req })

  if (!session) return res.status(401).send("You're not logged in")

  if (req.method === 'POST') {
    const { error, value } = jf.validateAsClass(req.body, TweetAction)

    if (error) return res.status(400).send(error.details[0].message)

    const { action, tweetId } = value

    const data = {
      tweetId,
      userId: session!.user.id,
    }

    const findData = { where: data }
    const createData = { data }

    try {
      switch (action) {
        case TWEET_ACTIONS.RETWEET:
          if (await prisma.reTweet.findFirst(findData))
            return res.status(400).send(ERROR_ACTION_ALREADY_CREATED)

          await prisma.reTweet.create(createData)
          break
        case TWEET_ACTIONS.LIKE:
          if (await prisma.like.findFirst(findData))
            return res.status(400).send(ERROR_ACTION_ALREADY_CREATED)

          await prisma.like.create(createData)
          break
        case TWEET_ACTIONS.BOOKMARK:
          if (await prisma.bookmark.findFirst(findData))
            return res.status(400).send(ERROR_ACTION_ALREADY_CREATED)

          await prisma.bookmark.create(createData)
          break
      }

      res.status(201).end()
    } catch (error) {
      res.status(500).send('Internal server error')
    }
    return
  }

  if (req.method === 'DELETE') {
    const { error, value } = jf.validateAsClass<any, TweetAction>(
      req.body,
      TweetAction
    )

    if (error) return res.status(400).send(error.details[0].message)

    const { action, tweetId } = value

    const findData = {
      where: {
        tweetId,
        userId: session!.user.id,
      },
    }

    try {
      switch (action) {
        case TWEET_ACTIONS.RETWEET:
          await prisma.reTweet.deleteMany(findData)
          break
        case TWEET_ACTIONS.LIKE:
          await prisma.like.deleteMany(findData)
          break
        case TWEET_ACTIONS.BOOKMARK:
          await prisma.bookmark.deleteMany(findData)
          break
      }

      res.status(204).end()
    } catch (error) {
      console.log(error)
      res.status(500).send('Internal server error')
    }
  }
}

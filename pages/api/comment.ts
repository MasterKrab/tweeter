import type { NextApiRequest, NextApiResponse } from 'next'
import type Comment from 'types/comment'
import { getSession } from 'next-auth/react'
import * as jf from 'joiful'
import prisma from 'lib/db/prisma'
import parseFormData from 'lib/middlewares/parseFormData'
import CreateComment from 'schemas/CreateComment'
import REPLY_PERMISSIONS from 'lib/replyPermissions'
import { uploadImage, deleteResource, OutputImage } from 'lib/db/media'

export default async (
  req: NextApiRequest,
  res: NextApiResponse<Comment | string>
) => {
  if (req.method !== 'POST') return res.status(405).end('Method not allowed')

  const session = await getSession({ req })

  if (!session) return res.status(401).send("You're not logged in")

  await parseFormData(req)

  const { error, value } = jf.validateAsClass(req.body, CreateComment)

  if (error) return res.status(400).send(error.message)

  const userId = session.user.id!

  const { content, files, tweetId } = value

  let media: OutputImage | undefined

  try {
    const tweet = await prisma.tweet.findUnique({
      where: {
        id: tweetId,
      },
      select: {
        userId: true,
        replyPermission: true,
      },
    })

    if (!tweet) return res.status(404).send('Tweet not found')

    if (
      tweet.replyPermission === REPLY_PERMISSIONS.FOLLOWING &&
      userId !== tweet.userId
    ) {
      const follower = await prisma.follower.findFirst({
        where: {
          followedId: userId,
          followerId: tweet.userId,
        },
      })

      if (!follower)
        return res.status(403).send('You can not reply to this tweet')
    }

    media = files.media ? await uploadImage(userId, files.media) : undefined

    const data = {
      content,
      userId,
      tweetId,
      mediaUrl: media?.url,
      mediaWidth: media?.width,
      mediaHeight: media?.height,
    }

    const { createdAt, ...comment } = await prisma.comment.create({ data })

    res.status(201).json({
      ...comment,
      tweetId,
      createdAt: createdAt.toISOString(),
      liked: false,
      user: {
        id: session!.user.id,
        name: session!.user.name,
        image: session!.user.image,
      },
      count: {
        likes: 0,
      },
    })
  } catch (error) {
    media && (await deleteResource(media.publicId))
    console.error(error)
    res.status(500).send('Internal server error')
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}

import type { NextApiRequest, NextApiResponse } from 'next'
import type Tweet from 'types/tweet'
import { getSession } from 'next-auth/react'
import * as jf from 'joiful'
import prisma from 'lib/db/prisma'
import parseFormData from 'lib/middlewares/parseFormData'
import CreateTweet from 'schemas/CreateTweet'
import { uploadImage, deleteResource, OutputImage } from 'lib/db/media'
import getHashtags from 'utils/getHashtags'

export default async (
  req: NextApiRequest,
  res: NextApiResponse<Tweet | string>
) => {
  if (req.method !== 'POST') return res.status(405).end('Method not allowed')

  const session = await getSession({ req })

  if (!session) return res.status(401).send("You're not logged in")

  await parseFormData(req)

  const { error, value } = jf.validateAsClass(req.body, CreateTweet)

  if (error) return res.status(400).send(error.message)

  const userId = session.user.id

  const { content, files, replyPermission } = value

  let media: OutputImage | undefined

  try {
    media = files.media ? await uploadImage(userId, files.media) : undefined

    const data = {
      content,
      replyPermission,
      userId,
      mediaUrl: media?.url,
      mediaWidth: media?.width,
      mediaHeight: media?.height,
    }

    const { id, createdAt, ...tweet } = await prisma.tweet.create({ data })

    const hashtags = getHashtags(content)

    if (hashtags?.length) {
      await prisma.hashtag.createMany({
        data: hashtags.map((hashtag: string) => ({
          name: hashtag.slice(1),
          tweetId: id,
        })),
      })
    }

    res.status(201).json({
      id,
      ...tweet,
      createdAt: createdAt.toISOString(),
      canReply: true,
      reTweeted: false,
      liked: false,
      bookmarked: false,
      user: {
        id: session!.user.id,
        name: session!.user.name,
        image: session!.user.image,
      },
      count: {
        comments: 0,
        reTweets: 0,
        bookmarks: 0,
      },
      comments: [],
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

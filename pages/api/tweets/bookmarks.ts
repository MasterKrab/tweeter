import type { NextApiRequest, NextApiResponse } from 'next'
import type Tweet from 'types/tweet'
import { getSession } from 'next-auth/react'
import isSomeArray from 'utils/isSomeArray'
import convertToNumbers from 'utils/convertToNumbers'
import getBookmarksTweets from 'lib/db/getBookmarksTweets'

export default async (
  req: NextApiRequest,
  res: NextApiResponse<Tweet[] | string>
) => {
  if (req.method !== 'GET') return res.status(405).end('Method not allowed')

  const session = await getSession({ req })

  if (!session) return res.status(401).send("You're not logged in")

  const userId = session.user.id

  const { take = '10', skip = '0', media = false, likes = false } = req.query

  if (isSomeArray(take, skip, media, likes))
    return res.status(400).send('Invalid query')

  const { result, error } = convertToNumbers(take as string, skip as string)

  if (error) return res.status(400).send('Invalid query')

  const [normalizedTake, normalizedSkip] = result!

  const tweets = await getBookmarksTweets({
    userId,
    take: normalizedTake,
    skip: normalizedSkip,
    media: media === 'true',
    likes: likes === 'true',
  })

  res.status(200).json(tweets)
}

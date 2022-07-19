import type { NextApiRequest, NextApiResponse } from 'next'
import type Tweet from 'types/tweet'
import { getSession } from 'next-auth/react'
import isSomeArray from 'utils/isSomeArray'
import convertToNumbers from 'utils/convertToNumbers'
import getTweets from 'lib/db/getTweets'

export default async (
  req: NextApiRequest,
  res: NextApiResponse<Tweet[] | string>
) => {
  if (req.method !== 'GET') return res.status(405).end('Method not allowed')

  const session = await getSession({ req })

  const userId = session?.user?.id

  const { take = '10', skip = '0' } = req.query

  if (isSomeArray(take, skip)) return res.status(400).send('Invalid query')

  const { result, error } = convertToNumbers(take as string, skip as string)

  if (error) return res.status(400).send('Invalid query')

  const [normalizedTake, normalizedSkip] = result!

  const tweets = await getTweets({
    userId,
    take: normalizedTake,
    skip: normalizedSkip,
  })

  res.status(200).json(tweets)
}

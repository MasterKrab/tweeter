import type { NextApiRequest, NextApiResponse } from 'next'
import type UserExplore from 'types/user-explore'
import getUsers from 'lib/db/getUsers'

export default async (
  req: NextApiRequest,
  res: NextApiResponse<UserExplore[] | string>
) => {
  if (req.method !== 'GET') return res.status(405).end('Method not allowed')

  const { skip = '0', take = '10', search } = req.query

  if (
    typeof take !== 'string' ||
    typeof skip !== 'string' ||
    (search !== undefined && typeof search !== 'string')
  )
    return res.status(400).send('Invalid query')

  const users = await getUsers({
    skip: Number(skip),
    take: Number(take),
    search,
  })

  res.status(201).json(users)
}

import type UserExplore from 'types/user-explore'
import axios from 'axios'

const getUsers = async (params: {
  take?: number
  skip?: number
  media?: boolean
  search?: string
}) => {
  if (!params.search?.trim()) params.search = undefined

  const { data } = await axios.get<UserExplore[]>('/api/users', { params })

  return data
}

export default getUsers

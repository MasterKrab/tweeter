import type Followed from 'types/followed'

interface User {
  id: string
  name: string
  image: string | null
  bio: string | null
  cover: string | null
  following: Followed[]
  count: {
    followers: number
    following: number
  }
}

export default User

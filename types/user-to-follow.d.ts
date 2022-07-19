interface UserToFollow {
  id: string
  name: string
  bio: string | null
  image: string | null
  cover: string | null
  isFollowed: boolean
  followersCount: number
}

export default UserToFollow

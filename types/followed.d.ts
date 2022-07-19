interface Followed {
  image: string | null
  id: string
  name: string
  bio: string
  isFollowed: boolean
  count: {
    followers: number
  }
}

export default Followed

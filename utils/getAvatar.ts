const getAvatar = (name: string) =>
  `https://api.dicebear.com/7.x/identicon/svg?seed=${name}`

export default getAvatar

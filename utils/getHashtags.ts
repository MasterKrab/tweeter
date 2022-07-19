const REGEX = /#\w+/g

const getHashtags = (text: string) => {
  const hashtags = text.match(REGEX)
  return hashtags?.length ? hashtags : null
}

export default getHashtags

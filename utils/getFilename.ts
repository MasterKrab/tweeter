const getFilename = (url: string, extension?: boolean) => {
  const filename = url.split('/').pop()

  if (!filename) return null

  if (!extension) return filename

  return filename.split('.')[0]
}

export default getFilename

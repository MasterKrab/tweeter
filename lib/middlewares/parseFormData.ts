import type { NextApiRequest } from 'next'
import formParse from 'utils/formParse'

const parseFormData = async (request: NextApiRequest) => {
  if (
    request.method !== 'POST' ||
    !request.headers['content-type']?.includes('multipart/form-data')
  )
    return

  request.body = await formParse(request)
}

export default parseFormData

import type { NextApiRequest } from 'next'
import formidable from 'formidable'

const form = formidable({ multiples: true })

const formParse = (request: NextApiRequest) =>
  new Promise((resolve, reject) => {
    form.parse(request, (error, fields, files) => {
      if (error) reject(error)

      resolve({
        ...fields,
        files,
      })
    })
  })

export default formParse

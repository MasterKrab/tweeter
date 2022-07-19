import * as jf from 'joiful'
import IMAGE_FORMATS from 'lib/imageFormats'

class UploadFile {
  @jf.string()
  filepath!: string

  @jf.string()
  newFilename!: string

  @jf.string()
  originalFilename!: string

  //  add custom errors messages
  @jf.string().valid(IMAGE_FORMATS).error(new Error('Invalid image format'))
  mimetype!: string

  @jf.number()
  size!: number

  @jf.boolean()
  hashAlgorithm!: boolean

  @jf.string().allow(null)
  hash!: string | null

  @jf.date()
  lastModified!: Date
}

export default UploadFile

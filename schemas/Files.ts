import * as jf from 'joiful'
import UploadFile from 'schemas/UploadFile'

class Files {
  @jf.object().options({ allowUnknown: true })
  media?: UploadFile
}

export default Files

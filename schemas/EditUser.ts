import * as jf from 'joiful'
import UploadFile from 'schemas/UploadFile'

class Files {
  @jf.object().options({ allowUnknown: true })
  avatar?: UploadFile

  @jf.object().options({ allowUnknown: true })
  cover?: UploadFile
}

class EditUser {
  @jf.string().trim().min(3).max(20)
  name?: string

  @jf.string().trim().max(255).allow('')
  bio?: string

  @jf.boolean().optional()
  defaultAvatar?: boolean

  @jf.boolean().optional()
  removeCover?: boolean

  @jf.object()
  files!: Files
}

export default EditUser

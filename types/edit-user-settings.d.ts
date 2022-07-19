interface EditUserSettings {
  name: string
  bio?: string
  defaultAvatar?: boolean
  removeCover?: boolean
  cover?: File
  avatar?: File
}

export default EditUserSettings

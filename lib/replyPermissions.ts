const REPLY_PERMISSIONS: {
  EVERYONE: 'everyone'
  FOLLOWING: 'following'
} = {
  EVERYONE: 'everyone',
  FOLLOWING: 'following',
}

export type Permission =
  typeof REPLY_PERMISSIONS[keyof typeof REPLY_PERMISSIONS]

export default REPLY_PERMISSIONS

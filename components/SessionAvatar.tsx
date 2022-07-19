import Avatar from 'components/Avatar'
import { useSession } from 'next-auth/react'

interface SessionAvatarProps {
  size?: number
  radius?: string
  includeAlt?: boolean
  priority?: boolean
}

const SessionAvatar = ({
  size,
  radius,
  includeAlt,
  priority,
}: SessionAvatarProps) => {
  const { data: session } = useSession()

  const { image, name } = session!.user

  return (
    <Avatar
      src={image}
      alt={includeAlt ? name : ''}
      size={size}
      radius={radius}
      priority={priority}
    />
  )
}

export default SessionAvatar

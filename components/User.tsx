import { useSession } from 'next-auth/react'
import HeaderRightLayout from 'components/HeaderRightLayout'
import SessionAvatar from 'components/SessionAvatar'
import UserToolTip from 'components/UserToolTip'

const User = () => {
  const { data: session } = useSession()

  const { name } = session!.user

  return (
    <>
      <HeaderRightLayout aria-label="User">
        <SessionAvatar size={32} priority={true} />
        <p className="name">{name}</p>
        <UserToolTip />
      </HeaderRightLayout>
      <style jsx>{`
        :global(.header-right-layout) {
          display: flex;
          align-items: center;
          gap: 0.688rem;
        }

        .name {
          font-weight: bold;
          font-size: 0.75rem;
        }

        @media screen and (max-width: 48rem) {
          .name {
            position: absolute;
            top: -9999px;
            left: -9999px;
          }
        }
      `}</style>
    </>
  )
}

export default User

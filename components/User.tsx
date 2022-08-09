import { useState, MouseEvent } from 'react'
import { useSession } from 'next-auth/react'
import HeaderRightLayout from 'components/HeaderRightLayout'
import SessionAvatar from 'components/SessionAvatar'
import UserToolTip from 'components/UserToolTip'

const User = () => {
  const { data: session } = useSession()

  const { name } = session!.user

  const [isOpenToolTip, setIsOpenToolTip] = useState(false)

  const handleToggleTooltip = (e: MouseEvent) => {
    e.stopPropagation()
    setIsOpenToolTip(!isOpenToolTip)
  }

  const handleCloseToolTip = () => setIsOpenToolTip(false)

  return (
    <>
      <HeaderRightLayout onClick={handleToggleTooltip} ariaLabel="User">
        <SessionAvatar size={32} priority={true} />
        <p className="name">{name}</p>
        <UserToolTip isOpen={isOpenToolTip} onClose={handleCloseToolTip} />
      </HeaderRightLayout>
      <style jsx>{`
        :global(.header-right-layout) {
          display: flex;
          align-items: center;
          gap: 0.688rem;
        }

        @media (hover: hover) {
          :global(.header-right-layout .toggle) {
            transition: transform 0.2s ease-in-out;
          }

          :global(.header-right-layout:hover .toggle) {
            transform: scale(1.5);
          }
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

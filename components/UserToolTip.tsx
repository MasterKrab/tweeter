import Image from 'next/image'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import HeaderRightLayout from 'components/HeaderRightLayout'
import ToolTip from 'components/Tooltip'
import resetButton from 'styles/resetButton'
import toolTipActionStyles from 'styles/toolTipActionStyles'

interface UserToolTipProps {
  isOpen: boolean
  onToggle?: () => void
  onClose: () => void
}

const UserToolTip = ({ isOpen, onClose, onToggle }: UserToolTipProps) => {
  const { data: session } = useSession()

  const id = session!.user.id

  const handleLogout = () => signOut({ callbackUrl: '/' })

  return (
    <>
      <HeaderRightLayout onClick={onToggle} aria-label="User">
        <button className="toggle" role="switch" aria-checked={isOpen}>
          <Image
            src="/assets/images/arrow-drop-down.svg"
            alt="User actions"
            width={20}
            height={20}
          />
        </button>
        <ToolTip isOpen={isOpen} onClose={onClose}>
          <li>
            <Link href={`/profile/${id}`}>
              <a className="action action--gray">
                <Image
                  src="/assets/images/profile.svg"
                  alt="Profile"
                  width={17}
                  height={17}
                />
                My profile
              </a>
            </Link>
          </li>
          <li>
            <Link href="/settings">
              <a className="action">
                <Image
                  src="/assets/images/settings.svg"
                  alt="Profile"
                  width={17}
                  height={17}
                />
                Settings
              </a>
            </Link>
          </li>
          <li>
            <button className="action action--bottom" onClick={handleLogout}>
              <Image
                src="/assets/images/logout.svg"
                alt="Profile"
                width={17}
                height={17}
              />
              Logout
            </button>
          </li>
        </ToolTip>
      </HeaderRightLayout>
      <style jsx>{resetButton}</style>
      <style jsx>{toolTipActionStyles}</style>
      <style jsx>{`
        .toggle {
          display: grid;
          place-items: center;
          height: 2rem;
        }

        .action--gray {
          background-color: var(--gray-light);
        }

        .action--bottom {
          position: relative;
          margin-top: 0.25rem;
          color: var(--red);
        }

        .action--bottom::before {
          content: '';
          position: absolute;
          top: -0.35rem;
          left: 0;
          background-color: var(--gray-light-2);
          width: 100%;
          height: 0.063rem;
        }
      `}</style>
    </>
  )
}

export default UserToolTip

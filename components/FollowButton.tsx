import Image from 'next/image'
import { useState, MouseEvent } from 'react'
import { createFollower, deleteFollower } from 'lib/clientApi/follower'
import Spinner from 'components/Spinner'
import resetButton from 'styles/resetButton'

interface FollowButtonProps {
  defaultIsFollowed: boolean
  width?: string
  height?: string
  stopPropagation?: boolean
  userId: string
}

const FollowButton = ({
  defaultIsFollowed,
  width = '4.938rem',
  height = '1.5rem',
  stopPropagation = false,
  userId,
}: FollowButtonProps) => {
  const [isFollowed, setIsFollowed] = useState(defaultIsFollowed)
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async (e: MouseEvent) => {
    stopPropagation && e.stopPropagation()

    try {
      setIsLoading(true)

      if (isFollowed) {
        await deleteFollower(userId)
        setIsFollowed(false)
      } else {
        await createFollower(userId)
        setIsFollowed(true)
      }
    } catch (error) {
      if (error === 'You already follow this user') setIsFollowed(true)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <button
        role="switch"
        onClick={handleClick}
        className="follow-button"
        aria-label="Followed"
        aria-checked={isFollowed}
      >
        {isLoading ? (
          <Spinner
            ariaLabel="Creating tweet"
            size="1.25rem"
            marginLeft="auto"
            marginRight="auto"
          />
        ) : isFollowed ? (
          'Following'
        ) : (
          <>
            <Image
              src="/assets/images/follow.svg"
              alt="follow"
              width={15}
              height={10}
            />
            Follow
          </>
        )}
      </button>
      <style jsx>{resetButton}</style>
      <style jsx>{`
        .follow-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.286rem;
          background: var(--blue);
          font-size: 0.75rem;
          color: #fff;
          border-radius: 0.25rem;
        }
      `}</style>
      <style jsx>{`
        .follow-button {
          width: ${width};
          height: ${height};
        }
      `}</style>
    </>
  )
}

export default FollowButton

import type UserToFollow from 'types/user-to-follow'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import Avatar from 'components/Avatar'
import FollowButton from 'components/FollowButton'
import kFormatter from 'utils/kFormatter'
import createPushClickEvents from 'utils/createPushClickEvents'
import resetButton from 'styles/resetButton'

const Item = ({
  id,
  name,
  image,
  bio,
  cover,
  isFollowed,
  followersCount,
}: UserToFollow) => {
  const { data: session } = useSession()

  return (
    <>
      <li className="item">
        <article
          className="user"
          data-cursor-pointer
          {...createPushClickEvents(`/profile/${id}`)}
        >
          <header className="user__header">
            <Avatar src={image!} />
            <div>
              <h3 className="user__name">
                <Link href={`/profile/${id}`}>
                  <a>{name}</a>
                </Link>
              </h3>
              <p className="user__followers">
                {kFormatter(followersCount)} followers
              </p>
            </div>
            {session && (
              <FollowButton
                defaultIsFollowed={isFollowed}
                userId={id}
                stopPropagation
              />
            )}
          </header>
          {bio && <p className="user__text">{bio}</p>}
          {cover && <img className="user__cover" src={cover} alt={name} />}
        </article>
        <style jsx>{resetButton}</style>
        <style jsx>{`
          .item:not(:last-child) {
            padding-bottom: 1.375rem;
            margin-bottom: 1.8rem;
            border-bottom: 1px solid var(--gray-light-2);
          }

          .user__header {
            display: flex;
            align-items: center;
            gap: 1.094rem;
          }

          .user__header > :global(.follow-button) {
            margin-left: auto;
          }

          .user__name {
            margin-top: 0;
            margin-bottom: 0;
            font-size: 1rem;
          }

          .user__followers {
            margin-top: 0.3rem;
            margin-bottom: 0;
            font-size: 0.75rem;
            color: var(--gray);
          }

          .user__text {
            margin-top: 1.2rem;
            margin-bottom: 1.321rem;
            font-size: 0.875rem;
            color: var(--gray);
            word-break: break-all;
          }

          .user__cover {
            width: 100%;
            height: 9.607rem;
            margin-bottom: 1.321rem;
            border-radius: 0.5rem;
            object-fit: cover;
          }
        `}</style>
      </li>
    </>
  )
}

export default Item

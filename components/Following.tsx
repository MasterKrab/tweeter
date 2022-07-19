import type Followed from 'types/followed'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useId } from 'react'
import Avatar from 'components/Avatar'
import FollowButton from 'components/FollowButton'
import MessageEmpty from 'components/MessageEmpty'
import createPushClickEvents from 'utils/createPushClickEvents'
import kFormatter from 'utils/kFormatter'
import resetButton from 'styles/resetButton'
import resetList from 'styles/resetList'

interface FollowersProps {
  name: string
  users: Followed[]
  titleId: string
  onClose: () => void
}

const Following = ({ name, users, titleId, onClose }: FollowersProps) => {
  const id = useId()

  return (
    <>
      <motion.article
        className="following "
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
      >
        <header className="following__header">
          <h2 className="following__title" id={titleId}>
            {name} is following
          </h2>
          <button
            className="following__button"
            onClick={onClose}
            data-autofocus={users.length === 0 ? true : undefined}
          >
            <Image
              src="/assets/images/close.svg"
              alt="Close"
              width={15}
              height={15}
            />
          </button>
        </header>
        <ul className="following__list">
          {users.length ? (
            users.map(
              (
                {
                  id: userId,
                  name,
                  image,
                  bio,
                  isFollowed,
                  count: { followers },
                },
                index
              ) => (
                <li className="following__item" key={`${id}-${userId}`}>
                  <article className="followed">
                    <header
                      className="followed__header"
                      {...createPushClickEvents(`/profile/${userId}`)}
                    >
                      <Avatar src={image!} />
                      <h3 className="followed__name">
                        <Link href={`/profile/${userId}`}>
                          <a data-autofocus={index === 0 || undefined}>
                            {name}
                          </a>
                        </Link>
                      </h3>
                      <p className="followed__followers">
                        {kFormatter(followers)} followers
                      </p>
                    </header>
                    <FollowButton defaultIsFollowed={isFollowed} userId={id} />
                    {bio && <p className="followed__bio">{bio}</p>}
                  </article>
                </li>
              )
            )
          ) : (
            <li className="following__item">
              <MessageEmpty headingLevel={3} />
            </li>
          )}
        </ul>
      </motion.article>
      <style jsx>{resetList}</style>
      <style jsx>{resetButton}</style>
      <style jsx>{`
        :global(.following) {
          background-color: #fff;
          width: 90%;
          max-width: 39.75rem;
          min-height: 20rem;
          padding: 1.071rem 1.861rem;
          text-align: start;
          border-radius: 0.5rem;
        }

        @media screen and (max-height: 20rem) {
          :global(.following) {
            min-height: auto;
            height: 90%;
          }
        }

        .following__header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 0.5rem;
        }

        .following__title {
          margin-top: 0;
          margin-bottom: 0;
          font-size: 0.75rem;
          color: var(--gray-4);
        }

        .following__button {
          display: grid;
          place-items: center;
        }

        .following__list {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.473rem;
          padding-right: 0.25rem;
          max-height: min(35rem, 70vh);
          overflow-y: auto;
        }

        .following__list::-webkit-scrollbar {
          width: 0.5rem;
        }

        .following__list::-webkit-scrollbar-thumb {
          background-color: var(--gray-light-2);
          border-radius: 0.5rem;
        }

        .following__item {
          padding-top: 1.03rem;
          border-top: 1px solid var(--gray-light-2);
        }

        .followed {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
        }

        .followed > :global(.follow-button) {
          justify-self: right;
        }

        .followed__header {
          display: grid;
          grid-template-columns: auto 1fr;
          column-gap: 1.094rem;
          cursor: pointer;
        }

        .followed__header > :global(.avatar) {
          grid-row: span 2;
        }

        .followed__name {
          margin-top: 0;
          margin-bottom: 0.2rem;
          font: 1rem bold var(--font-secondary);
          color: #000;
        }

        .followed__followers {
          margin-top: 0;
          margin-bottom: 0;
          font-size: 0.75rem;
          color: var(--gray-2);
          grid-column: 2 / 3;
        }

        .followed__bio {
          margin-top: 1.2rem;
          margin-bottom: 0;
          grid-column: span 2;
        }
      `}</style>
    </>
  )
}

export default Following

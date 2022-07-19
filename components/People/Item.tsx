import type UserExplore from 'types/user-explore'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Avatar from 'components/Avatar'
import kFormatter from 'utils/kFormatter'
import createPushClickEvents from 'utils/createPushClickEvents'

const Item = ({ id, name, image, bio, cover, followersCount }: UserExplore) => (
  <>
    <motion.article
      className="people-user"
      initial={{ scale: 0.75, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <header
        className="people-user__header"
        data-cursor-pointer
        {...createPushClickEvents(`/profile/${id}`)}
      >
        <Avatar src={image!} loading="lazy" />
        <h2 className="people-user__name">
          <Link href={`/profile/${id}`}>
            <a>{name}</a>
          </Link>
        </h2>
        <p className="people-user__followers">
          {kFormatter(followersCount)} followers
        </p>
      </header>
      {bio && <p className="people-user__bio">{bio}</p>}
      {cover && <img className="people-user__cover" src={cover} alt={name} />}
    </motion.article>
    <style jsx>{`
      :global(.people-user) {
        background-color: #fff;
        padding: 1.25rem;
        border-radius: 0.5rem;
        box-shadow: 0 0.188rem 0.25rem rgba(0, 0, 0, 0.05);
      }

      .people-user__header > :global(.avatar) {
        grid-row: span 2;
      }

      .people-user__header {
        display: grid;
        grid-template-columns: auto 1fr;
        column-gap: 1.094rem;
      }

      .people-user__name,
      .people-user__followers {
        margin-top: 0;
        margin-bottom: 0;
      }

      .people-user__name {
        font: 1rem bold var(--font-secondary);
      }

      .people-user__followers {
        font-size: 0.75rem;
        color: var(--gray-2);
        grid-column: 2 / 3;
      }

      .people-user__cover {
        width: 100%;
        height: 15rem;
        border-radius: 0.5rem;
        object-fit: cover;
      }
    `}</style>
  </>
)

export default Item

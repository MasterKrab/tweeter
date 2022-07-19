import type UserExplore from 'types/user-explore'
import { useRef } from 'react'
import useInfiniteScroll from 'hooks/useInfiniteScroll'
import Item from 'components/People/Item'
import MessageEmpty from 'components/MessageEmpty'

interface PeopleProps {
  users: UserExplore[]
  onLoadMoreUsers: () => void
}

const People = ({ users, onLoadMoreUsers }: PeopleProps) => {
  const tweetsRef = useRef<HTMLElement>(null)
  const dump = useInfiniteScroll(() => users.length && onLoadMoreUsers())

  return (
    <>
      <article ref={tweetsRef} className="people" aria-label="People">
        {users.length ? (
          <>
            {users.map((user) => (
              <Item key={user.id} {...user} />
            ))}
            <div ref={dump} />
          </>
        ) : (
          <MessageEmpty />
        )}
      </article>
      <style jsx>{`
        .people {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.659rem;
        }
      `}</style>
    </>
  )
}

export default People

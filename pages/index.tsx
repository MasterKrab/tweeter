import type { GetServerSideProps } from 'next'
import type Hashtag from 'types/hashtag'
import type UserToFollow from 'types/user-to-follow'
import { getSession, useSession } from 'next-auth/react'
import { useSelector } from 'react-redux'
import { wrapper, useAppDispatch } from 'app/store'
import {
  TWEETS_IDS,
  createSelectTweets,
  fetchTweets,
  setTweets,
} from 'reducers/tweetsSlice'
import getTweets from 'lib/db/getTweets'
import Metadata from 'components/Metadata'
import AddTweet from 'components/AddTweet'
import Tweets from 'components/Tweets'
import Trends from 'components/Trends'
import UsersToFollow from 'components/UsersToFollow'
import getHashtags from 'lib/db/getHashtags'
import getUsersToFollow from 'lib/db/getUsersToFollow'

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ req }) => {
    const session = await getSession({ req })

    const userId = session?.user?.id

    const dispatchTweets = async () => {
      const tweets = await getTweets({ userId, take: 20 })
      store.dispatch(setTweets({ tweets, id: TWEETS_IDS.HOME }))
    }

    const [hashtags, usersToFollow] = await Promise.all([
      getHashtags(6),
      getUsersToFollow(2, userId),
      dispatchTweets(),
    ])

    return {
      props: {
        hashtags,
        usersToFollow,
      },
    }
  })

interface HomeProps {
  hashtags: Hashtag[]
  usersToFollow: UserToFollow[]
}

const Home = ({ hashtags, usersToFollow }: HomeProps) => {
  const { data: session } = useSession()
  const { data: tweets, loading } = useSelector(
    createSelectTweets(TWEETS_IDS.HOME)
  )
  const dispatch = useAppDispatch()

  const loadTweets = () => {
    dispatch(
      fetchTweets({
        id: 'home',
        take: 10,
        skip: tweets.length,
      })
    )
  }

  return (
    <>
      <Metadata title="Home" />
      <div className="body">
        {session && <AddTweet />}
        <Tweets
          tweets={tweets}
          onLoadMoreTweets={loadTweets}
          isLoading={loading}
          ariaLabel="Tweets"
          payloadId={TWEETS_IDS.HOME}
        />
      </div>
      {(hashtags.length > 0 || usersToFollow.length > 0) && (
        <aside className="aside">
          {hashtags.length > 0 && <Trends hashtags={hashtags} />}
          {usersToFollow.length > 0 && (
            <UsersToFollow usersToFollow={usersToFollow} />
          )}
        </aside>
      )}
      <style jsx>{`
        :global(.main[data-route='']) {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.375rem;
        }

        @media screen and (min-width: 48rem) {
          :global(.main[data-route='']) {
            grid-template-columns: 1fr 19.125rem;
          }
        }
      `}</style>
      <style jsx>{`
        .body {
          display: flex;
          flex-direction: column;
          gap: 1.563rem;
        }

        .aside {
          display: flex;
          flex-direction: column;
          gap: 1.375rem;
        }
      `}</style>
    </>
  )
}

export default Home

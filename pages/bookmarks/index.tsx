import type { GetServerSideProps } from 'next'
import { useSelector } from 'react-redux'
import { getSession, useSession } from 'next-auth/react'
import { wrapper, useAppDispatch } from 'app/store'
import getBookmarksTweets from 'lib/db/getBookmarksTweets'
import {
  TWEETS_IDS,
  setTweets,
  createSelectTweets,
  fetchBookmarksTweets,
} from 'reducers/tweetsSlice'
import useFilter from 'hooks/useFilter'
import BOOKMARKS_TWEETS_FILTERS, {
  BookmarkTweetFilter,
  bookmarksTweetsFilter,
  BOOKMARKS_TWEETS_TEXTS,
} from 'lib/filters/bookmarksTweetsFilter'
import Filter from 'components/Filter'
import Tweets from 'components/Tweets'
import mainFilterStyles from 'styles/mainFilterStyles'

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ req }) => {
    const session = await getSession({ req })

    const userId = session?.user?.id

    if (!userId)
      return {
        redirect: {
          destination: '/api/auth/signin',
          permanent: false,
        },
      }

    const tweets = await getBookmarksTweets({ userId, take: 10 })

    store.dispatch(setTweets({ tweets, id: TWEETS_IDS.BOOKMARKS }))

    return {
      props: {},
    }
  })

const Bookmarks = () => {
  const { data: session } = useSession()
  const { data: tweets, loading } = useSelector(
    createSelectTweets(TWEETS_IDS.BOOKMARKS)
  )
  const dispatch = useAppDispatch()

  const loadTweets = (
    filter: BookmarkTweetFilter,
    skip: number = 0,
    reset: boolean = true
  ) => {
    dispatch(
      fetchBookmarksTweets({
        id: TWEETS_IDS.BOOKMARKS,
        skip,
        reset,
        take: 10,
        likes: filter === BOOKMARKS_TWEETS_FILTERS.LIKES,
        media: filter === BOOKMARKS_TWEETS_FILTERS.MEDIA,
      })
    )
  }

  const { filter, handleChangeFilter } = useFilter<BookmarkTweetFilter>(
    BOOKMARKS_TWEETS_FILTERS.TWEETS,
    loadTweets
  )

  const handleLoadMoreTweets = () => loadTweets(filter, tweets.length, false)

  return (
    <>
      <Filter
        value={filter}
        onChange={handleChangeFilter}
        values={bookmarksTweetsFilter}
        texts={BOOKMARKS_TWEETS_TEXTS}
      />
      {session && (
        <Tweets
          tweets={tweets}
          onLoadMoreTweets={handleLoadMoreTweets}
          isLoading={loading}
          ariaLabel="Bookmarks"
          payloadId={TWEETS_IDS.BOOKMARKS}
        />
      )}
      <style jsx>{mainFilterStyles}</style>
    </>
  )
}

export default Bookmarks

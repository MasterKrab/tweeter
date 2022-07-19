import type { GetServerSideProps } from 'next'
import type UserExplore from 'types/user-explore'
import { getSession } from 'next-auth/react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useForm, useWatch } from 'react-hook-form'
import { wrapper, useAppDispatch } from 'app/store'
import getExploreTweets from 'lib/db/getExploreTweets'
import getUsers from 'lib/clientApi/getUsers'
import {
  TWEETS_IDS,
  setTweets,
  createSelectTweets,
  fetchExploreTweets,
} from 'reducers/tweetsSlice'
import useFilter from 'hooks/useFilter'
import EXPLORE_FILTERS, {
  ExploreFilter,
  exploreFilters,
  EXPLORE_FILTERS_TEXTS,
} from 'lib/filters/exploreFilters'
import Filter from 'components/Filter'
import SearchBox, { SearchForm } from 'components/SearchBox'
import Tweets from 'components/Tweets'
import People from 'components/People'
import mainFilterStyles from 'styles/mainFilterStyles'

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ req }) => {
    const session = await getSession({ req })

    const userId = session?.user?.id

    const tweets = await getExploreTweets({
      userId,
      take: 10,
      orderByReTweetsCount: true,
      orderByLikesCount: true,
    })

    store.dispatch(setTweets({ tweets, id: TWEETS_IDS.EXPLORE }))

    return {
      props: {},
    }
  })

const Explore = () => {
  const { data: tweets, loading } = useSelector(
    createSelectTweets(TWEETS_IDS.EXPLORE)
  )
  const dispatch = useAppDispatch()

  const [users, setUsers] = useState<UserExplore[]>([])

  const form = useForm<SearchForm>()
  const { control, reset: resetSearchForm } = form
  const query = useWatch({ control, name: 'query', defaultValue: '' })

  const loadTweets = ({
    filter,
    skip = 0,
    reset = false,
    search = query,
  }: {
    filter: ExploreFilter
    skip?: number
    reset?: boolean
    search?: string
  }) =>
    dispatch(
      fetchExploreTweets({
        id: TWEETS_IDS.EXPLORE,
        reset,
        skip,
        take: 10,
        search,
        media: filter === EXPLORE_FILTERS.MEDIA,
        orderByReTweetsCount: filter === EXPLORE_FILTERS.TOP,
        orderByLikesCount: filter === EXPLORE_FILTERS.TOP,
      })
    )

  const loadUsers = () => getUsers({ search: query }).then(setUsers)

  const loadData = async (filter: ExploreFilter) => {
    resetSearchForm()
    setUsers([])

    filter === EXPLORE_FILTERS.PEOPLE
      ? loadUsers()
      : loadTweets({ filter, reset: true, search: '' })
  }

  const { filter, handleChangeFilter } = useFilter<ExploreFilter>(
    EXPLORE_FILTERS.TOP,
    loadData
  )

  const handleLoadMoreTweets = () => loadTweets({ filter, skip: tweets.length })

  const handleLoadMoreUsers = async () => {
    const newUsers = await getUsers({ skip: users.length, search: query })
    setUsers([...users, ...newUsers])
  }

  const handleSearch = () =>
    filter === EXPLORE_FILTERS.PEOPLE
      ? loadUsers()
      : loadTweets({
          filter,
          reset: true,
        })

  return (
    <>
      <Filter
        value={filter}
        onChange={handleChangeFilter}
        values={exploreFilters}
        texts={EXPLORE_FILTERS_TEXTS}
      />
      <div className="body">
        <SearchBox form={form} onSearch={handleSearch} />
        {filter !== EXPLORE_FILTERS.PEOPLE ? (
          <Tweets
            tweets={tweets}
            onLoadMoreTweets={handleLoadMoreTweets}
            isLoading={loading}
            ariaLabel="Tweets"
            payloadId={TWEETS_IDS.EXPLORE}
          />
        ) : (
          <People users={users} onLoadMoreUsers={handleLoadMoreUsers} />
        )}
      </div>
      <style jsx>{mainFilterStyles}</style>
      <style jsx>{`
        .body {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.034rem;
        }
      `}</style>
    </>
  )
}

export default Explore

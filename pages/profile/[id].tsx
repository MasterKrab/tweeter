import type { GetServerSideProps } from 'next'
import type User from 'types/user'
import { motion } from 'framer-motion'
import { useState, useId } from 'react'
import { getSession, useSession } from 'next-auth/react'
import { useSelector } from 'react-redux'
import { wrapper, useAppDispatch } from 'app/store'
import {
  TWEETS_IDS,
  createSelectTweets,
  fetchProfileTweets,
  setTweets,
} from 'reducers/tweetsSlice'
import getProfileTweets from 'lib/db/getProfileTweets'
import useIsLoadingRouteListener from 'hooks/useIsLoadingRouteListener'
import useFilter from 'hooks/useFilter'
import getUser from 'lib/db/getUser'
import PROFILE_TWEETS_FILTERS, {
  ProfileTweetFilter,
  profileTweetsFilters,
  PROFILE_TWEETS_TEXTS,
} from 'lib/filters/profileTweetsFilters'
import kFormatter from 'utils/kFormatter'
import Metadata from 'components/Metadata'
import Avatar from 'components/Avatar'
import Modal from 'components/Modal'
import Following from 'components/Following'
import FollowButton from 'components/FollowButton'
import Filter from 'components/Filter'
import SyncRetweeted from 'components/SyncRetweeted'
import Tweets from 'components/Tweets'
import resetList from 'styles/resetList'
import resetButton from 'styles/resetButton'

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ req, params }) => {
    const id = params?.id

    if (typeof id !== 'string') {
      return {
        notFound: true,
      }
    }

    const session = await getSession({ req })

    const userId = session?.user?.id

    const profileUser = await getUser(id, userId)

    if (!profileUser) {
      return {
        notFound: true,
      }
    }

    const profileId = profileUser.id

    const isFollowed =
      userId && userId !== profileId
        ? profileUser.followers.some(({ followerId }) => followerId === userId)
        : false

    const tweets = await getProfileTweets({
      userId,
      take: 20,
      profileId,
      profileTweets: true,
      profileRetweets: true,
    })

    store.dispatch(setTweets({ tweets, id: TWEETS_IDS.PROFILE }))

    return {
      props: {
        isFollowed,
        user: {
          id: profileId,
          count: profileUser.count,
          name: profileUser.name,
          image: profileUser.image,
          bio: profileUser.bio,
          cover: profileUser.cover,
          following: profileUser.following,
        },
      },
    }
  })

interface ProfileProps {
  user: User
  isFollowed: boolean
}

const Profile = ({
  user: { id: profileId, name, image, bio, cover, following, count },
  isFollowed,
}: ProfileProps) => {
  const { data: session } = useSession()
  const { data: tweets, loading } = useSelector(
    createSelectTweets(TWEETS_IDS.PROFILE)
  )
  const dispatch = useAppDispatch()
  const id = useId()

  const [isOpenFollowingModal, setIsOpenFollowingModal] = useState(false)
  useIsLoadingRouteListener(() => setIsOpenFollowingModal(false))

  const toggleIsOpenFollowingModal = () =>
    setIsOpenFollowingModal(!isOpenFollowingModal)

  const followingModalTitleId = `${id}-following-modal-title`

  const loadTweets = (
    filter: ProfileTweetFilter,
    skip: number = 0,
    reset: boolean = true
  ) => {
    dispatch(
      fetchProfileTweets({
        id: TWEETS_IDS.PROFILE,
        skip,
        reset,
        profileId,
        take: 10,
        media: filter === PROFILE_TWEETS_FILTERS.MEDIA,
        profileTweets:
          filter === PROFILE_TWEETS_FILTERS.TWEETS ||
          filter === PROFILE_TWEETS_FILTERS.TWEETS_AND_REPLIES ||
          filter === PROFILE_TWEETS_FILTERS.MEDIA,
        profileRetweets: filter === PROFILE_TWEETS_FILTERS.TWEETS,
        profileReplies: filter === PROFILE_TWEETS_FILTERS.TWEETS_AND_REPLIES,
        profileLikes: filter === PROFILE_TWEETS_FILTERS.LIKES,
      })
    )
  }

  const { filter, handleChangeFilter } = useFilter<ProfileTweetFilter>(
    PROFILE_TWEETS_FILTERS.TWEETS,
    loadTweets
  )

  const handleLoadMoreTweets = () => loadTweets(filter, tweets.length, false)

  return (
    <>
      <Metadata title={name} />
      <motion.article
        className="profile"
        initial={{ scale: 0.75, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <div className="profile__avatar-container">
          <Avatar src={image!} size={122} priority={true} />
        </div>
        <div className="profile__body">
          <h1 className="title">{name}</h1>
          <ul className="social">
            <li className="social__item">
              <button onClick={toggleIsOpenFollowingModal}>
                <span className="social__key">
                  {kFormatter(count.following)}
                </span>{' '}
                Following
              </button>
              <Modal
                isOpen={isOpenFollowingModal}
                onClose={toggleIsOpenFollowingModal}
                ariaLabelledBy={followingModalTitleId}
              >
                <Following
                  titleId={followingModalTitleId}
                  name={name}
                  users={following}
                  onClose={toggleIsOpenFollowingModal}
                />
              </Modal>
            </li>
            <li className="social__item">
              <span className="social__key">{kFormatter(count.followers)}</span>{' '}
              Followers
            </li>
          </ul>
        </div>
        <p className="profile__bio">{bio}</p>
        {session && session.user.id !== profileId && (
          <FollowButton
            width="6.313rem"
            height="2rem"
            defaultIsFollowed={isFollowed}
            userId={profileId}
          />
        )}
      </motion.article>
      <section className="body" aria-label="Tweets">
        <Filter
          value={filter}
          onChange={handleChangeFilter}
          values={profileTweetsFilters}
          texts={PROFILE_TWEETS_TEXTS}
        />
        <div className="tweets">
          <SyncRetweeted name={name} id={id} />
          <Tweets
            tweets={tweets}
            onLoadMoreTweets={handleLoadMoreTweets}
            isLoading={loading}
            ariaLabelledBy={id}
            payloadId={TWEETS_IDS.PROFILE}
          />
        </div>
      </section>
      <style jsx>{resetList}</style>
      <style jsx>{resetButton}</style>
      <style jsx>{`
        :global(.main[data-route='profile/[id]']) {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.654rem;
          padding: 0.854rem;
        }

        @media screen and (min-width: 64rem) {
          :global(.main[data-route='profile/[id]']) {
            gap: 1.571rem;
          }
        }

        :global(.main[data-route='profile/[id]']::before) {
          content: '';
          position: absolute;
          top: var(--header-height);
          left: 0;
          z-index: -1;
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
          width: 100vw;
          height: 10.504rem;
        }
      `}</style>
      <style jsx>{`
        :global(.main[data-route='profile/[id]']::before) {
          background-image: ${cover ? `url(${cover})` : 'none'};
        }
      `}</style>
      <style jsx>{`
        :global(.profile) {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          background-color: #fff;
          margin-top: 8.509rem;
          padding: 1.5rem 1rem 1.448rem;
          border-radius: 0.75rem;
          text-align: center;
          box-shadow: 0 0.188rem 0.25rem rgba(0, 0, 0, 0.05);
        }

        @media screen and (min-width: 64rem) {
          :global(.profile) {
            display: grid;
            grid-template-columns: 10rem 1fr 8.038rem;
            align-items: start;
            gap: 1.384rem 1.269rem;
            padding: 1.508rem 1.25rem;
            text-align: start;
          }
        }

        :global(.profile) > .profile__avatar-container {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translate(-50%, -75%);
          background-color: #fff;
          border: 0.5rem solid #fff;
          border-radius: 0.5rem;
        }

        :global(.profile .avatar__image) {
          border-radius: 0;
        }

        @media screen and (min-width: 64rem) {
          :global(.profile) > .profile__avatar-container {
            left: 1.508rem;
            transform: translateY(-45%);
            grid-row: span 2;
          }

          :global(.profile .avatar__image) {
            width: 10rem;
            height: 10rem;
          }
        }

        @media screen and (min-width: 64rem) {
          .profile__body {
            display: flex;
            gap: 1.644rem;
            grid-column: 2 / 3;
          }
        }

        .title {
          font-size: 1.5rem;
          font-family: var(--font-secondary);
          color: var(--gray-4);
        }

        @media screen and (min-width: 64rem) {
          .title {
            margin-top: 0;
            margin-bottom: 0;
          }
        }

        .social {
          display: flex;
          justify-content: center;
          gap: 2rem;
          font-family: var(--font-secondary);
          font-size: 0.75rem;
          color: var(--gray);
        }

        .social__item {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .social__key {
          color: var(--gray-4);
        }

        .profile__bio {
          margin-bottom: 1.602rem;
          font-size: 1.125rem;
          word-break: break-all;
        }

        @media screen and (min-width: 64rem) {
          .profile__bio {
            grid-column: 2 / 3;
            margin-top: 0;
            margin-bottom: 0;
          }
        }

        @media screen and (min-width: 64rem) {
          :global(.profile > .follow-button) {
            grid-row: 1 / 2;
            grid-column: 3 / 4;
          }
        }

        @media screen and (min-width: 64rem) {
          .body {
            display: grid;
            grid-template-columns: 19rem 1fr;
            gap: 1.5rem;
            margin-top: 0;
          }
        }

        .tweets {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.67rem;
          margin-top: 1.716rem;
        }

        @media screen and (min-width: 64rem) {
          .tweets {
            margin-top: 0;
          }
        }
      `}</style>
    </>
  )
}

export default Profile

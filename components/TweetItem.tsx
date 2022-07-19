import type Tweet from 'types/tweet'
import type { tweetId } from 'reducers/tweetsSlice'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useAppDispatch } from 'app/store'
import { useSession } from 'next-auth/react'
import classnames from 'classnames'
import {
  fetchCreateTweetAction,
  fetchDeleteTweetAction,
} from 'reducers/tweetsSlice'
import getActionIsAlreadyDone from 'utils/getActionIsAlreadyDone'
import createPushClickEvents from 'utils/createPushClickEvents'
import TWEET_ACTIONS, { TweetAction } from 'lib/tweetActions'
import Avatar from 'components/Avatar'
import MediaImage from 'components/MediaImage'
import Spinner from 'components/Spinner'
import AddComment from 'components/AddComment'
import CommentItem from 'components/CommentItem'
import resetList from 'styles/resetList'
import resetButton from 'styles/resetButton'

interface TweetItemProps extends Tweet {
  payloadId: tweetId
}

const TweetItem = ({ payloadId, ...tweet }: TweetItemProps) => {
  const {
    id,
    content,
    mediaUrl,
    mediaWidth,
    mediaHeight,
    createdAt,
    reTweeted,
    liked,
    bookmarked,
    user: { id: userId, name, image },
    count,
    canReply,
    comments,
  } = tweet

  const dispatch = useAppDispatch()

  const commentFormId = `comment-form-${id}`

  const [isSubmittingForm, setIsSubmittingForm] = useState(false)

  const onChangeIsSubmitting = (isSubmittingForm: boolean) =>
    setIsSubmittingForm(isSubmittingForm)

  const { data: session } = useSession()

  const createHandleAction = (action: TweetAction) => () => {
    const data = { id: payloadId, action, tweetId: id }

    dispatch(
      getActionIsAlreadyDone(tweet, action)
        ? fetchDeleteTweetAction(data)
        : fetchCreateTweetAction(data)
    )
  }

  return (
    <>
      <motion.article
        className="tweet"
        aria-label={`${name} tweets`}
        initial={{ scale: 0.75, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <header
          className="tweet__header"
          data-cursor-pointer
          {...createPushClickEvents(`/profile/${userId}`)}
        >
          <Avatar src={image!} loading="lazy" />
          <p className="tweet__name">
            <Link href={`/profile/${userId}`}>
              <a>{name}</a>
            </Link>
          </p>
          <time className="tweet__date" dateTime={createdAt}>
            {new Date(createdAt).toLocaleString('en')}
          </time>
        </header>
        <div>
          <p className="tweet__content">{content}</p>
          {mediaUrl && mediaWidth && mediaHeight && (
            <MediaImage
              src={mediaUrl}
              width={mediaWidth}
              height={mediaHeight}
            />
          )}
          <ul className="stats">
            <li>{count.comments} Comments</li>
            <li>{count.reTweets} ReTweets</li>
            <li>{count.bookmarks} Saved</li>
          </ul>
        </div>
        {session?.user && (
          <>
            <section className="actions" aria-label="Actions">
              <button
                className="actions__button"
                type="submit"
                form={commentFormId}
                disabled={!canReply && !isSubmittingForm}
              >
                {isSubmittingForm ? (
                  <Spinner
                    size="1.25rem"
                    ariaLabel="Creating Comment"
                    primaryColor="var(--gray-2)"
                    secondaryColor="var(--blue)"
                  />
                ) : (
                  <Image
                    src="/assets/images/comment.svg"
                    alt=""
                    width={17}
                    height={17}
                  />
                )}
                <span className="actions__button-text">
                  {isSubmittingForm ? 'Loading' : 'Comment'}
                </span>
              </button>
              <button
                className={classnames({
                  actions__button: true,
                  'actions__button--green': reTweeted,
                })}
                role="switch"
                aria-label="Retweeted"
                aria-checked={reTweeted}
                onClick={createHandleAction(TWEET_ACTIONS.RETWEET)}
              >
                <Image
                  src={`/assets/images/retweet-${
                    reTweeted ? 'green' : 'gray'
                  }.svg`}
                  alt=""
                  width={17}
                  height={17}
                />
                <span className="actions__button-text">
                  {reTweeted ? 'Retweeted' : 'Retweet'}
                </span>
              </button>
              <button
                className={classnames({
                  actions__button: true,
                  'actions__button--red': liked,
                })}
                role="switch"
                aria-label="Liked"
                aria-checked={liked}
                onClick={createHandleAction(TWEET_ACTIONS.LIKE)}
              >
                <Image
                  src={`/assets/images/like-${liked ? 'red' : 'gray'}.svg`}
                  alt=""
                  width={17}
                  height={17}
                />
                <span className="actions__button-text">
                  {liked ? 'Liked' : 'Like'}
                </span>
              </button>
              <button
                className={classnames({
                  actions__button: true,
                  'actions__button--blue': bookmarked,
                })}
                role="switch"
                aria-label="Saved"
                aria-checked={bookmarked}
                onClick={createHandleAction(TWEET_ACTIONS.BOOKMARK)}
              >
                <Image
                  src={`/assets/images/bookmark-${
                    bookmarked ? 'blue' : 'gray'
                  }.svg`}
                  alt=""
                  width={17}
                  height={17}
                />
                <span className="actions__button-text">
                  {bookmarked ? 'Saved' : 'Save'}
                </span>
              </button>
            </section>
            {canReply && (
              <AddComment
                tweetId={id}
                formId={commentFormId}
                onChangeIsSubmitting={onChangeIsSubmitting}
                payloadId={payloadId}
              />
            )}
          </>
        )}

        {comments.length > 0 && (
          <section aria-label="Comments">
            <ul
              className={classnames({
                comments: true,
                'comments--with-form': canReply,
              })}
            >
              {comments.map((comment) => (
                <CommentItem
                  key={comment.id}
                  payloadId={payloadId}
                  {...comment}
                />
              ))}
            </ul>
          </section>
        )}
      </motion.article>
      <style jsx>{resetList}</style>
      <style jsx>{resetList}</style>
      <style jsx>{resetButton}</style>
      <style jsx>{`
        :global(.tweet) {
          background-color: #fff;
          padding: 1.25rem;
          border-radius: 0.5rem;
          box-shadow: 0 0.188rem 0.25rem rgba(0, 0, 0, 0.05);
        }

        .tweet__header {
          display: grid;
          grid-template-columns: auto 1fr;
          column-gap: 1.094rem;
        }

        .tweet__header > :global(.avatar) {
          grid-row: span 2;
        }

        .tweet__name {
          margin-top: 0;
          margin-bottom: 0;
          line-height: 1.5rem;
          font-weight: bold;
          font-family: var(--font-secondary);
        }

        .tweet__date {
          font-size: 0.75rem;
          color: var(--gray-2);
        }

        .tweet__content {
          margin-top: 1.375rem;
          margin-bottom: 1.194rem;
          line-height: 1.362rem;
          color: var(--gray-3);
        }

        .stats {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          margin-top: 0.75rem;
          margin-bottom: 0.5rem;
          font-size: 0.75rem;
          color: var(--gray-2);
        }

        .actions {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: 2.573rem;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: var(--gray-3);
          border-top: 1px solid var(--gray-light);
          border-bottom: 1px solid var(--gray-light);
        }

        .actions__button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          border-radius: 0.5rem;
        }

        .actions__button--blue {
          color: var(--blue);
        }

        .actions__button--red {
          color: var(--red);
        }

        .actions__button--green {
          color: var(--green);
        }

        @media (hover: hover) {
          .actions__button {
            transition: background-color 0.2s ease-in-out;
          }

          .actions__button:hover {
            background-color: var(--gray-light);
          }
        }

        @media screen and (max-width: 31.25rem) {
          .actions__button-text {
            position: absolute;
            font-size: 0;
          }
        }

        .comments--with-form {
          margin-top: 0.5rem;
          padding-top: 0.029rem;
          border-top: 1px solid var(--gray-light);
        }
      `}</style>
    </>
  )
}

export default TweetItem

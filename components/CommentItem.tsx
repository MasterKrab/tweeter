import type Comment from 'types/comment'
import type { tweetId } from 'reducers/tweetsSlice'
import Image from 'next/image'
import Link from 'next/link'
import { useAppDispatch } from 'app/store'
import { useSession } from 'next-auth/react'
import classnames from 'classnames'
import {
  fetchCreateCommentLike,
  fetchDeleteCommentLike,
} from 'reducers/tweetsSlice'
import kFormatter from 'utils/kFormatter'
import createPushClickEvents from 'utils/createPushClickEvents'
import resetButton from 'styles/resetButton'
import Avatar from 'components/Avatar'
import MediaImage from 'components/MediaImage'

interface CommentItemProps extends Comment {
  tweetId: string
  payloadId: tweetId
}

const CommentItem = ({
  id,
  content,
  mediaUrl,
  mediaWidth,
  mediaHeight,
  createdAt,
  liked,
  tweetId,
  payloadId,
  user: { id: userId, name, image },
  count: { likes },
}: CommentItemProps) => {
  const dispatch = useAppDispatch()

  const { data: session } = useSession()

  const handleLike = () => {
    const data = { id: payloadId, tweetId, commentId: id }

    dispatch(
      liked ? fetchDeleteCommentLike(data) : fetchCreateCommentLike(data)
    )
  }

  return (
    <>
      <li>
        <section className="comment" aria-label={`${name} comments`}>
          <Avatar
            src={image!}
            loading="lazy"
            data-cursor-pointer
            {...createPushClickEvents(`/profile/${userId}`)}
          />
          <div className="comment__body">
            <div
              className="comment__top"
              data-cursor-pointer
              {...createPushClickEvents(`/profile/${userId}`)}
            >
              <p className="comment__name">
                <Link href={`/profile/${userId}`}>
                  <a>{name}</a>
                </Link>
              </p>
              <time className="comment__date" dateTime={createdAt}>
                {new Date(createdAt).toLocaleString('en')}
              </time>
            </div>
            <p className="comment__content">{content}</p>
            {mediaUrl && mediaWidth && mediaHeight && (
              <MediaImage
                src={mediaUrl}
                width={mediaWidth}
                height={mediaHeight}
              />
            )}
          </div>
          <div className="comment__bottom">
            {session?.user && (
              <button
                onClick={handleLike}
                className={classnames({
                  comment__button: true,
                  'comment__button--liked': liked,
                })}
                role="switch"
                aria-label="Liked"
                aria-checked={liked}
              >
                <Image
                  src={`/assets/images/like-${
                    liked ? 'red' : 'gray-light'
                  }.svg`}
                  alt=""
                  width={13}
                  height={12}
                />
                {liked ? 'Liked' : 'Like'}
              </button>
            )}
            <p className="comment__likes">{kFormatter(likes)} likes</p>
          </div>
        </section>
      </li>
      <style jsx>{resetButton}</style>
      <style jsx>{`
        .comment {
          display: grid;
          gap: 0.5rem 0.679rem;
          margin-top: 1.177rem;
        }

        @media screen and (min-width: 31.25rem) {
          .comment {
            grid-template-columns: auto 1fr;
            row-gap: 0.168rem;
          }
        }

        .comment__top {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .comment__body {
          background-color: var(--gray-light-3);
          padding: 0.566rem 0.942rem;
          border-radius: 0.5rem;
        }

        .comment__name {
          margin-top: 0;
          margin-bottom: 0;
          line-height: 1.5rem;
          font-size: 0.875rem;
          font-weight: bold;
          font-family: var(--font-secondary);
        }

        .comment__date {
          font-size: 0.75rem;
          color: var(--gray-2);
        }

        .comment__content {
          margin-top: 0.5rem;
          margin-bottom: 0.736rem;
          color: var(--gray-3);
        }

        .comment__bottom {
          display: flex;
          align-items: center;
          gap: 1.286rem;
          color: var(--gray-2);
          font-size: 0.75rem;
        }

        @media screen and (min-width: 31.25rem) {
          .comment__bottom {
            grid-column: 2 / 3;
          }
        }

        .comment__button {
          display: flex;
          align-items: center;
          gap: 0.333rem;
        }

        .comment__button--liked {
          color: var(--red);
        }

        .comment__likes {
          margin-top: 0;
          margin-bottom: 0;
        }
      `}</style>
    </>
  )
}

export default CommentItem

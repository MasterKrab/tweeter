import type NewTweet from 'types/new-tweet'
import type { Permission } from 'lib/replyPermissions'
import type { tweetId } from 'reducers/tweetsSlice'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { useAppDispatch } from 'app/store'
import useAutoIncreaseHeight from 'hooks/useAutoIncreaseHeight'
import { fetchCreateTweet } from 'reducers/tweetsSlice'
import SessionAvatar from 'components/SessionAvatar'
import ImageInput from 'components/ImageInput'
import ReplyPermission from './ReplyPermission'
import Spinner from 'components/Spinner'
import resetButton from 'styles/resetButton'

interface AddTweetProps {
  payloadId?: tweetId
}

const AddTweet = ({ payloadId = 'home' }: AddTweetProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewTweet>()
  const dispatch = useAppDispatch()

  const content = register('content', { required: true })
  const contentValue = watch('content')
  const textareaRef = useAutoIncreaseHeight(contentValue)

  const replyPermission = watch('replyPermission', 'everyone')
  const media = watch('media')

  const onSubmit = (data: NewTweet) =>
    dispatch(fetchCreateTweet({ id: payloadId, data })).then(() => reset())

  const handleChangeMedia = (file: File) => setValue('media', file)

  const handleChamgeReplyPermission = (value: Permission) =>
    setValue('replyPermission', value)

  return (
    <>
      <motion.form
        className="add-tweet"
        onSubmit={handleSubmit(onSubmit)}
        initial={{ scale: 0.75, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.75, opacity: 0 }}
      >
        <h1 className="add-tweet__title">Tweet something</h1>
        <div className="add-tweet__body">
          <SessionAvatar includeAlt size={32} priority={true} />
          <textarea
            className="add-tweet__textarea"
            aria-label="Write your tweet"
            placeholder="What's happening?"
            aria-invalid={!!errors.content}
            {...content}
            ref={(element) => {
              content.ref(element)
              textareaRef.current = element
            }}
          ></textarea>
          <div className="add-tweet__bottom">
            <div className="add-tweet__buttons">
              <ImageInput
                color="blue"
                name="media"
                onChange={handleChangeMedia}
              />
              <ReplyPermission
                value={replyPermission || 'everyone'}
                onChange={handleChamgeReplyPermission}
              />
            </div>
            <button className="add-tweet__submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <Spinner
                  ariaLabel="Creating tweet"
                  size="1.25rem"
                  marginLeft="auto"
                  marginRight="auto"
                />
              ) : (
                'Tweet'
              )}
            </button>
          </div>
          {media && (
            <img
              className="add-tweet__media"
              src={URL.createObjectURL(media)}
              alt="media"
            />
          )}
        </div>
      </motion.form>
      <style jsx>{resetButton}</style>
      <style jsx>{`
        :global(.add-tweet) {
          background-color: #fff;
          padding: 0.682rem 1.25rem;
          border-radius: 0.5rem;
        }

        .add-tweet__title {
          font-size: 0.625rem;
          font-family: var(--font-secondary);
          margin-bottom: 0.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid var(--gray-light-2);
        }

        .add-tweet__body {
          display: grid;
          gap: 0.906rem;
        }

        @media screen and (min-width: 48rem) {
          .add-tweet__body {
            grid-template-columns: auto 1fr;
          }
        }

        .add-tweet__bottom {
          display: flex;
          flex-direction: column;
          gap: 0.864rem;
        }

        @media screen and (min-width: 48rem) {
          .add-tweet__bottom {
            flex-direction: row;
            grid-column: 2 / 3;
          }
        }

        .add-tweet__buttons {
          display: flex;
          align-items: center;
          gap: 0.864rem;
        }

        .add-tweet__textarea {
          resize: none;
          border: none;
          min-height: 2.549rem;
          height: 2.549rem;
          max-height: 12rem;
        }

        .add-tweet__textarea::-webkit-scrollbar {
          display: none;
        }

        .add-tweet__textarea:placeholder {
          color: var(--gray-2);
        }

        .add-tweet__submit {
          background-color: var(--blue);
          width: 5.063rem;
          height: 2rem;
          font-size: 0.75rem;
          color: #fff;
          border-radius: 0.25rem;
        }

        @media screen and (min-width: 48rem) {
          .add-tweet__submit {
            margin-left: auto;
          }
        }

        .add-tweet__media {
          width: 100%;
          max-width: 10rem;
          margin-bottom: 0.5rem;
          border-radius: 0.5rem;
        }

        @media screen and (min-width: 48rem) {
          .add-tweet__media {
            grid-column: 2 / 3;
          }
        }
      `}</style>
    </>
  )
}

export default AddTweet

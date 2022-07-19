import type { NewCommentForm } from 'types/new-comment'
import type { tweetId } from 'reducers/tweetsSlice'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useAppDispatch } from 'app/store'
import useAutoIncreaseHeight from 'hooks/useAutoIncreaseHeight'
import { fetchCreateComment } from 'reducers/tweetsSlice'
import SessionAvatar from 'components/SessionAvatar'
import ImageInput from 'components/ImageInput'

interface AddCommentProps {
  tweetId: string
  formId: string
  onChangeIsSubmitting: (isSubmitting: boolean) => void
  payloadId: tweetId
}

const AddComment = ({
  tweetId,
  formId,
  onChangeIsSubmitting,
  payloadId,
}: AddCommentProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewCommentForm>()
  const dispatch = useAppDispatch()

  useEffect(
    () => onChangeIsSubmitting(isSubmitting),
    [isSubmitting, onChangeIsSubmitting]
  )

  const content = register('content', { required: true })
  const contentValue = watch('content')
  const textareaRef = useAutoIncreaseHeight(contentValue)

  const media = watch('media')
  const onSubmit = (data: NewCommentForm) =>
    dispatch(
      fetchCreateComment({
        id: payloadId,
        data: {
          ...data,
          tweetId,
        },
      })
    ).then(() => reset())

  const handleChangeMedia = (file: File) => setValue('media', file)

  return (
    <>
      <form className="form" onSubmit={handleSubmit(onSubmit)} id={formId}>
        <SessionAvatar includeAlt />
        <textarea
          className="form__textarea"
          aria-label="Tweet your reply"
          placeholder="Tweet your reply"
          aria-invalid={!!errors.content}
          {...content}
          ref={(element) => {
            content.ref(element)
            textareaRef.current = element
          }}
        ></textarea>
        <div className="form__image-input">
          <ImageInput
            onChange={handleChangeMedia}
            color={media ? 'blue' : 'gray'}
            name="media"
          />
        </div>
        {media && (
          <img
            className="form__media"
            src={URL.createObjectURL(media)}
            alt="media"
          />
        )}
      </form>
      <style jsx>{`
        .form {
          position: relative;
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 0.168rem 0.679rem;
          margin-top: 0.625rem;
        }

        .form__textarea {
          background-color: var(--gray-light-3);
          resize: none;
          font-size: 0.875rem;
          padding: 0.656rem 1.25rem 0.656rem 0.75rem;
          min-height: 2.5rem;
          height: 2.5rem;
          max-height: 7.5rem;
          border: 1px solid var(--gray-light);
          border-radius: 0.5rem;
        }

        .form__textarea::-webkit-scrollbar {
          display: none;
        }

        .form__textarea:placeholder {
          color: var(--gray-2);
        }

        .form__image-input {
          position: absolute;
          top: 0.781rem;
          right: 0.781rem;
        }

        .form__media {
          width: 100%;
          max-width: 10rem;
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
          border-radius: 0.5rem;
          grid-column: 2 / 3;
        }
      `}</style>
    </>
  )
}

export default AddComment

import type { GetServerSideProps } from 'next'
import type UserSettings from 'types/user-settings'
import type EditUserSettings from 'types/edit-user-settings'
import { useState, useId, useEffect } from 'react'
import { getSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import Metadata from 'components/Metadata'
import ImageInput from 'components/ImageInput'
import ErrorMessage from 'components/ErrorMessage'
import ErrorToast from 'components/ErrorToast'
import Spinner from 'components/Spinner'
import DeleteUserButton from 'components/DeleteUserButton'
import useAutoIncreaseHeight from 'hooks/useAutoIncreaseHeight'
import useDropZone from 'hooks/useDropZone'
import classnames from 'classnames'
import getUserSettings from 'lib/db/getUserSettings'
import validateImageFormat from 'utils/validateImageFormat'
import editUserSettings from 'lib/clientApi/editUserSettings'
import reloadSession from 'utils/reloadSession'
import removeNoAlphaNumeric from 'utils/removeNoAlphaNumeric'
import getAvatar from 'utils/getAvatar'
import resetButton from 'styles/resetButton'

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })

  const userId = session?.user?.id

  if (!userId)
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    }

  const user = await getUserSettings(userId)

  return {
    props: {
      user,
    },
  }
}

interface SettingsProps {
  user: UserSettings
}

const Settings = ({ user }: SettingsProps) => {
  const [userSettings, setUserSettings] = useState(user)
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EditUserSettings>()

  const id = useId()
  const normalizedId = removeNoAlphaNumeric(id)

  const bio = register('bio')
  const bioValue = watch('bio')
  const textareaRef = useAutoIncreaseHeight(bioValue!)

  const createHandleChangeImage =
    (field: 'avatar' | 'cover') => (file: File) => {
      if (!validateImageFormat(file)) return setError('Invalid image format')

      setValue(field, file)
    }

  const handleChangeAvatar = createHandleChangeImage('avatar')
  const handleChangeCover = createHandleChangeImage('cover')

  const avatar = watch('avatar')
  const defaultAvatar = watch('defaultAvatar')
  const { events: avatarEvents } = useDropZone(
    handleChangeAvatar,
    defaultAvatar
  )

  const cover = watch('cover')
  const removeCover = watch('removeCover')
  const { isDragOver: isDragOverCover, events: coverEvents } = useDropZone(
    handleChangeCover,
    removeCover
  )

  const name = watch('name')

  const nameInputId = `name-input-${id}`
  const bioInputId = `bio-input-${id}`
  const defaultAvatarLabelId = `default-avatar-label-${normalizedId}`
  const removeCoverLabelId = `remove-cover-label-${normalizedId}`

  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (data: EditUserSettings) => {
    const { defaultAvatar, removeCover } = data

    if (defaultAvatar) delete data.avatar
    if (removeCover) delete data.cover

    setError(null)

    return editUserSettings(data)
      .then((editedUser) => {
        reloadSession()
        reset()
        setUserSettings(editedUser)
      })
      .catch(({ message }) => {
        const error =
          typeof message === 'string' ? message : 'Something went wrong'

        setError(error)

        setTimeout(() => {
          setError(null)
        }, 3000)
      })
  }

  useEffect(() => {
    setValue('name', userSettings.name)
    setValue('bio', userSettings.bio || '')
  }, [userSettings, setValue])

  const getCurrentAvatar = () => {
    if (defaultAvatar) return getAvatar(name)
    if (avatar) return URL.createObjectURL(avatar)
    return userSettings.image!
  }

  return (
    <>
      <Metadata title="Settings" />
      <h1 className="title">Settings</h1>
      <form className="profile" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="profile__title">Profile</h2>
        <div className="profile__fields">
          <div className="profile__field">
            <label className="profile__label" htmlFor={nameInputId}>
              Name
            </label>
            <input
              className="profile__input"
              {...register('name', {
                required: true,
              })}
              type="text"
              id={nameInputId}
              aria-invalid={!!errors.name}
            />
            {errors.name && <ErrorMessage>Please provide a name</ErrorMessage>}
          </div>

          <div className="profile__field">
            <label className="profile__label" htmlFor={bioInputId}>
              Bio
            </label>
            <textarea
              className="profile__textarea"
              aria-invalid={!!errors.bio}
              id={bioInputId}
              maxLength={255}
              {...bio}
              ref={(element) => {
                bio.ref(element)
                textareaRef.current = element
              }}
            />
          </div>

          <div
            className="profile__field profile__field--avatar"
            {...avatarEvents}
          >
            <ImageInput
              onChange={handleChangeAvatar}
              name="avatar"
              color="blue"
              disabled={defaultAvatar}
            >
              Change Avatar
            </ImageInput>

            <div className="profile__image-container">
              <p
                className={classnames({
                  'profile__image-message': true,
                  'profile__image-message--disable': defaultAvatar || !!avatar,
                })}
              >
                Drag & Drop image
              </p>
              <img
                className="profile__image"
                src={getCurrentAvatar()}
                alt={avatar ? avatar.name : 'avatar'}
              />
            </div>

            <label
              className="profile__checkbox-label"
              id={defaultAvatarLabelId}
            >
              Default Avatar
              <input
                type="checkbox"
                focus-target={defaultAvatarLabelId}
                {...register('defaultAvatar')}
              />
            </label>
          </div>

          <div
            className={classnames({
              profile__field: true,
              'profile__field--cover': true,
              'profile__field--cover-drag-over': isDragOverCover,
            })}
            {...coverEvents}
          >
            <div className="profile__cover-controls">
              <ImageInput
                onChange={handleChangeCover}
                name="cover"
                color="blue"
                disabled={removeCover}
              >
                Change Cover
              </ImageInput>
              {!user.cover && (
                <label
                  className="profile__checkbox-label profile__checkbox-label--reverse"
                  id={removeCoverLabelId}
                >
                  Remove Cover
                  <input
                    type="checkbox"
                    focus-target={removeCoverLabelId}
                    {...register('removeCover')}
                  />
                </label>
              )}
            </div>
            {!removeCover && (cover || userSettings.cover) ? (
              <img
                className="profile__image profile__image--cover"
                src={cover ? URL.createObjectURL(cover) : userSettings.cover!}
                alt={cover ? cover.name : 'cover'}
              />
            ) : (
              <p
                className={classnames({
                  'profile__no-cover': true,
                  'profile__no-cover--drag-over': isDragOverCover,
                })}
              >
                {removeCover ? 'No cover' : 'Drag & drop a image here'}
              </p>
            )}
          </div>
        </div>

        <button className="profile__submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <Spinner
              ariaLabel="Saving..."
              size="1.25rem"
              marginLeft="auto"
              marginRight="auto"
            />
          ) : (
            'Save'
          )}
        </button>

        {error && <ErrorToast message={error} />}
      </form>
      <section className="danger-zone">
        <h2 className="danger-zone__title">Danger Zone</h2>
        <DeleteUserButton />
      </section>
      <style jsx>{resetButton}</style>
      <style jsx>{`
        .title,
        .profile,
        .danger-zone {
          background-color: #fff;
          padding: min(5vw, 2rem);
          border-radius: 0.5rem;
        }

        .title {
          font-size: 1.5rem;
          padding-top: 1rem;
          padding-bottom: 1rem;
          margin-top: 0;
          margin-bottom: 1rem;
          color: var(--gray-4);
        }

        .danger-zone {
          margin-top: 2rem;
        }

        .profile__title,
        .danger-zone__title {
          font-size: 1.75rem;
          margin-top: 0;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--gray);
          color: var(--gray-4);
        }

        .profile__fields,
        .profile__field {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }

        .profile__field {
          gap: 0.5rem;
        }

        .profile__field--avatar {
          display: grid;
          place-items: center;
          order: -1;
          margin-left: auto;
          margin-right: auto;
        }

       @media screen and (min-width: 48rem) {
          .profile__fields {
            grid-template-columns: 1fr 14rem;
            column-gap: 1rem;
            order: 0;
          }

          .profile__field {
            grid-column: 1 / 2;
          }

          .profile__field--avatar {
            grid-column: 2 / 3;
            grid-row: 1 / 3;
            margin-left: auto;
          }

          .profile__field--cover {
            grid-column: span 2;
          }
        }

        .profile__field--avatar {
          object-fit: cover;
          width: 15rem;
        }

        .profile__field--avatar > :global(.label),
        .profile__field--cover  :global(.label) {
          display: flex;
          gap: 0.5rem;
        }

        .profile__field--cover :global(.label) {
          flex-direction: row-reverse;
          width: max-content;
        }

        .profile__image {
          width: 12rem;
          height: 12rem;
          border-radius: 0.5rem;
        }

        .profile__image-container {
          position: relative;
        }

        .profile__image-message {
          position: absolute;
          display: grid;
          place-items: center;
          background-color: rgba(255, 255, 255, 0.5);
          width: 100%;
          height: 100%;
          padding: 0.5rem;
          margin-top: 0;
          text-align: center;
          line-height: 1.5;
        }

        .profile__image-message--disable {
          opacity: 0;
        }

        .profile__image--cover {
          width: 100%;
          height: 10.504rem;
          object-fit: cover;
          object-position: center;
        }

        .profile__cover-controls{
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

         @media screen and (min-width: 21.875rem){
          .profile__cover-controls{
            flex-direction: row;
          }
         }

        .profile__no-cover {
          display: grid;
          place-items: center;
          margin-top: 0;
          margin-bottom: 0;
          height: 10.504rem;
          text-align: center;
          border: 2px dashed var(--gray-2);
          border-radius: 0.25rem;
          transition: border-color: 0.5s;
        }

        .profile__no-cover--drag-over {
          background-color: var(--gray-light-4);
        }

        .profile__label {
          font-size: 1.15rem;
        }

        .profile__input,
        .profile__textarea {
          padding: 0.5rem;
          border: 1px solid var(--gray-2);
          border-radius: 0.25rem;
        }

        .profile__textarea {
          min-height: 5rem;
          max-height: 15rem;
          overflow-y: hidden;
          resize: none;
        }

        .profile__checkbox-label {
          display: flex;
          gap: 0.5rem;
        }

        .profile__checkbox-label--reverse{
          flex-direction: row-reverse;
          justify-content: flex-end;
        }

        .profile__submit {
          background-color: var(--blue);
          margin-top: 1rem;
          padding: 0.5rem 2rem;
          color: #fff;
          border-radius: 0.25rem;
        }
      `}</style>
    </>
  )
}

export default Settings

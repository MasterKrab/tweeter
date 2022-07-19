import { useState, useId } from 'react'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import Modal from 'components/Modal'
import Spinner from 'components/Spinner'
import classnames from 'classnames'
import deleteUser from 'lib/clientApi/deleteUser'
import resetButton from 'styles/resetButton'

const DeleteUserButton = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<{ name: string }>({ mode: 'onChange' })

  const [isOpenModal, setIsOpenModal] = useState(false)
  const { data: session } = useSession()
  const id = useId()

  const handleToggleModal = () => setIsOpenModal(!isOpenModal)

  const name = session?.user?.name
  const nameInputId = `name-input-${id}`
  const nameValue = watch('name')

  const onSubmit = async () => {
    await deleteUser()
    window.location.href = '/'
  }

  return (
    <>
      <button className="button" onClick={handleToggleModal}>
        Delete Account
      </button>
      <Modal isOpen={isOpenModal} onClose={handleToggleModal}>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="form__title">
            Are you sure you want to delete your account?
          </h2>
          <p className="form__text">
            This action cannot be undone. All your data will be permanently
            deleted.
          </p>
          <div className="form__field">
            <label className="form__label" htmlFor={nameInputId}>
              Please type &quot;<strong>{name}</strong>&quot; to confirm.
            </label>
            <input
              className="form__input"
              {...register('name', {
                required: true,
                validate: (value) => value === name,
              })}
              type="text"
              autoComplete="off"
              id={nameInputId}
              aria-invalid={!!errors.name}
              disabled={isSubmitting}
              data-autofocus
            />
          </div>
          <div className="form__buttons">
            <button
              className="form__button"
              onClick={handleToggleModal}
              type="button"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              className={classnames({
                form__button: true,
                'form__button--delete': true,
                'form__button--invalid-form': !nameValue || !!errors.name,
              })}
              aria-disabled={!nameValue || !!errors.name || isSubmitting}
            >
              {isSubmitting ? (
                <Spinner
                  ariaLabel="Deleting your account"
                  size="1.25rem"
                  primaryColor="var(--gray-light-3)"
                  secondaryColor="var(--gray-2)"
                  marginLeft="auto"
                  marginRight="auto"
                />
              ) : (
                'Delete'
              )}
            </button>
          </div>
        </form>
      </Modal>
      <style jsx>{resetButton}</style>
      <style jsx>{`
        .button,
        .form__button {
          background-color: var(--red);
          padding: 0.5rem 1rem;
          color: #fff;
          border-radius: 0.25rem;
        }

        .form {
          background-color: #fff;
          width: 90%;
          max-width: 35rem;
          padding: min(5vw, 1.5rem);
          border-radius: 0.5rem;
        }

        .form__title,
        .form__text {
          margin-top: 0;
          margin-bottom: 0.75rem;
        }

        .form__title {
          font-size: 1.25rem;
        }

        .form__field {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form__input {
          padding: 0.5rem;
          border: 1px solid var(--gray-2);
          border-radius: 0.25rem;
        }

        .form__buttons {
          display: flex;
          align-items: flex-end;
          gap: 1rem;
          margin-top: 1rem;
        }

        .form__button {
          width: 5rem;
          background-color: var(--gray-light);
          color: var(--gray-4);
        }

        .form__button--delete {
          background-color: var(--red);
          color: #fff;
        }

        .form__button--invalid-form {
          opacity: 0.6;
        }
      `}</style>
    </>
  )
}

export default DeleteUserButton

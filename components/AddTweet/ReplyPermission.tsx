import { useState, useRef, useEffect, FocusEvent } from 'react'
import Image from 'next/image'
import REPLY_PERMISSIONS, { Permission } from 'lib/replyPermissions'
import resetButton from 'styles/resetButton'

interface ReplyPermisionProps {
  value: Permission
  onChange: (value: Permission) => void
}

const ReplyPermission = ({ value, onChange }: ReplyPermisionProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => setIsOpen(false), [value])

  const handleBlur = ({ relatedTarget }: FocusEvent) => {
    !container.current?.contains(relatedTarget as Node) && setIsOpen(false)
  }

  const handleToggleIsOpen = () => setIsOpen(!isOpen)

  const setValue = (value: Permission) => () => onChange(value)

  return (
    <>
      <div ref={container} onBlur={handleBlur} className="container">
        <button onClick={handleToggleIsOpen} className="button" type="button">
          <Image
            src={`/assets/images/${value}.svg`}
            width={17}
            height={17}
            alt={value}
          />
          {value === REPLY_PERMISSIONS.EVERYONE
            ? 'Everyone'
            : 'People you follow'}{' '}
          can reply
        </button>
        <section className="options">
          <h2 className="options__title">Who can reply?</h2>
          <p className="options__text">Choose who can reply to this Tweet.</p>
          <button
            className="options__button"
            type="button"
            onClick={setValue(REPLY_PERMISSIONS.EVERYONE)}
          >
            <Image
              src="/assets/images/everyone.svg"
              width={17}
              height={17}
              alt="everyone"
              style={{
                filter: 'brightness(0)',
              }}
            />
            Everyone
          </button>
          <button
            className="options__button"
            type="button"
            onClick={setValue(REPLY_PERMISSIONS.FOLLOWING)}
          >
            <Image
              src="/assets/images/following.svg"
              width={17}
              height={17}
              alt="following"
              style={{
                filter: 'brightness(0)',
              }}
            />
            People you follow
          </button>
        </section>
      </div>
      <style jsx>{resetButton}</style>
      <style jsx>{`
        .container {
          position: relative;
        }

        .button {
          display: flex;
          align-items: center;
          gap: 0.448rem;
          font-size: 0.75rem;
          color: var(--blue);
        }

        .options {
          position: absolute;
          top: 2.75rem;
          left: 0;
          background-color: #fff;
          width: 14.648rem;
          font-size: 0.75rem;
          padding: 0.571rem 0.75rem;
          transform-origin: top left;
          transition: transform 0.25s ease-in-out, visibility 0.25s;
          box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.05);
          border-radius: 0.25rem;
        }

        .options__title {
          font-size: 0.75rem;
          margin-top: 0;
          margin-bottom: 0.081rem;
        }

        .options__text {
          margin-top: 0;
          font-weight: 400;
          color: var(--gray);
        }

        .options__button {
          display: flex;
          align-items: center;
          gap: 0.604rem;
          padding: 0.718rem 0.834rem;
          width: 100%;
          height: 2.447rem;
          margin-top: 0.25rem;
        }

        @media (hover: hover) {
          .options__button {
            transition: background-color 0.25s ease-in-out;
          }

          .options__button:hover {
            background-color: var(--gray-light);
          }
        }
      `}</style>
      <style jsx>{`
        .options {
          visibility: ${isOpen ? 'visible' : 'hidden'};
          transform: ${isOpen ? 'scale(1)' : 'scale(0)'};
          t
        }
      `}</style>
    </>
  )
}

export default ReplyPermission

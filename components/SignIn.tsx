import Image from 'next/image'
import { useState, useId, MouseEvent } from 'react'
import HeaderRightLayout from 'components/HeaderRightLayout'
import Tooltip from 'components/Tooltip'
import useProviders from 'hooks/useProviders'
import { signIn } from 'next-auth/react'
import resetButton from 'styles/resetButton'
import toolTipActionStyles from 'styles/toolTipActionStyles'

const SignIn = () => {
  const [isOpenToolTip, setIsOpenToolTip] = useState(false)
  const providers = useProviders()

  const handleToggleTooltip = (e: MouseEvent) => {
    e.stopPropagation()
    setIsOpenToolTip(!isOpenToolTip)
  }

  const handleCloseToolTip = () => setIsOpenToolTip(false)

  const componentId = useId()

  const sectionLabelId = `${componentId}-section-label`

  return (
    <>
      <HeaderRightLayout ariaLabelledBy={sectionLabelId}>
        <button
          className="button"
          onClick={handleToggleTooltip}
          id={sectionLabelId}
          role="switch"
          aria-checked={isOpenToolTip}
        >
          Sign in
          <Image src="/assets/images/enter.svg" width={17} height={17} alt="" />
        </button>
        <Tooltip isOpen={isOpenToolTip} onClose={handleCloseToolTip}>
          {providers &&
            Object.values(providers).map(({ id, name }) => (
              <button
                key={`${componentId}-${id}`}
                className="action"
                onClick={() => signIn(id)}
              >
                <Image
                  src={`/assets/images/${id}.svg`}
                  alt=""
                  width={30}
                  height={30}
                />
                {name}
              </button>
            ))}
        </Tooltip>
      </HeaderRightLayout>
      <style jsx>{resetButton}</style>
      <style jsx>{toolTipActionStyles}</style>
      <style jsx>{`
        .button {
          display: flex;
          align-items: center;
          gap: 0.688rem;
        }

        .text {
          font-size: 0.8rem;
          font-weight: bold;
        }
      `}</style>
    </>
  )
}

export default SignIn

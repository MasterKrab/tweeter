import type { ReactNode, ChangeEvent } from 'react'
import { useId } from 'react'
import Image from 'next/image'
import classnames from 'classnames'
import visuallyHidden from 'styles/visuallyHidden'
import IMAGE_FORMATS from 'lib/imageFormats'
import removeNoAlphaNumeric from 'utils/removeNoAlphaNumeric'

interface ImageInputProps {
  value?: File[]
  name: string
  onChange: (file: File) => void
  color: 'blue' | 'gray'
  disabled?: boolean
  children?: ReactNode
}

const accept = IMAGE_FORMATS.join(',')

const ImageInput = ({
  name,
  onChange,
  color,
  disabled,
  children,
}: ImageInputProps) => {
  const id = useId()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.files![0])
  }

  const normalizedId = removeNoAlphaNumeric(id)

  const labelId = `image-input-${normalizedId}-label`

  return (
    <>
      <label
        id={labelId}
        className={classnames({
          label: true,
          'label--disabled': disabled,
        })}
        data-cursor-pointer={!disabled}
      >
        {children}
        <Image
          src={`/assets/images/image-${color}.svg`}
          alt="Image"
          width={17}
          height={17}
        />
        <input
          id={`image-input-${normalizedId}-input`}
          focus-target={labelId}
          className="visually-hidden"
          type="file"
          name={name}
          onChange={handleChange}
          accept={accept}
          disabled={disabled}
        />
      </label>
      <style jsx>{visuallyHidden}</style>
      <style jsx>{`
        .label {
          display: grid;
          place-items: center;
        }

        .label--disabled {
          opacity: 0.5;
        }
      `}</style>
    </>
  )
}

export default ImageInput

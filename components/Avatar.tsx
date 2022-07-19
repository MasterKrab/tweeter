import Image, { ImageProps } from 'next/image'
import blurPlaceHolder from 'utils/blurPlaceholder'

interface AvatarProps extends ImageProps {
  src: string
  size?: number
  radius?: string
}

const Avatar = ({
  size = 40,
  radius = '0.5rem',
  alt = '',
  ...props
}: AvatarProps) => (
  <>
    <div className="avatar">
      <Image
        className="avatar__image"
        width={size}
        height={size}
        alt={alt}
        blurDataURL={blurPlaceHolder}
        {...props}
      />
    </div>
    <style jsx>{`
      :global(.avatar__image) {
        border-radius: ${radius};
      }
    `}</style>
  </>
)

export default Avatar

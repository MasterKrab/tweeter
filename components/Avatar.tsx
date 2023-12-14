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
  src,
  ...props
}: AvatarProps) => (
  <>
    <div className="avatar">
      <Image
        className="avatar__image"
        width={size}
        height={size}
        alt={alt}
        src={src}
        blurDataURL={blurPlaceHolder}
        unoptimized={src.startsWith("https://api.dicebear.com/7.x/identicon")}
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

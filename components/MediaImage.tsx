import Image from 'next/image'
import blurPlaceHolder from 'utils/blurPlaceholder'

interface MediaImageProps {
  src: string
  width: number
  height: number
  alt?: string
  priority?: boolean
}

const MediaImage = ({ priority, ...props }: MediaImageProps) => (
  <>
    <Image
      {...props}
      className="media-image"
      alt="Media"
      placeholder="blur"
      blurDataURL={blurPlaceHolder}
      loading={priority ? 'eager' : 'lazy'}
      priority={priority}
    />
    <style jsx>{`
      :global(.media-image) {
        border-radius: 0.5rem;
      }
    `}</style>
  </>
)

export default MediaImage

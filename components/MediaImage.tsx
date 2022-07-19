import Image from 'next/image'
import blurPlaceHolder from 'utils/blurPlaceholder'

interface MediaImageProps {
  src: string
  width: number
  height: number
  alt?: string
}

const MediaImage = (props: MediaImageProps) => (
  <>
    <Image
      {...props}
      className="media-image"
      alt="Media"
      blurDataURL={blurPlaceHolder}
      loading="lazy"
    />
    <style jsx>{`
      :global(.media-image) {
        border-radius: 0.5rem;
      }
    `}</style>
  </>
)

export default MediaImage

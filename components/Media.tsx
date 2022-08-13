import Image from 'next/image'
import { motion } from 'framer-motion'
import resetButton from 'styles/resetButton'

interface MediaProps {
  file: File
  onRemove: () => void
}

const Media = ({ file, onRemove }: MediaProps) => (
  <>
    <motion.div
      className="media"
      initial={{ scale: 0.75, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.75, opacity: 0 }}
    >
      <button className="media__button" onClick={onRemove}>
        <Image
          className="media__button-image"
          src="/assets/images/close.svg"
          alt="Remove media"
          width={17}
          height={17}
        />
      </button>
      <img
        className="media__image"
        src={URL.createObjectURL(file)}
        alt="Added media"
      />
    </motion.div>
    <style jsx>{resetButton}</style>
    <style jsx>{`
      :global(.media) {
        position: relative;
        max-width: 10rem;
        margin-bottom: 0.5rem;
        transform-origin: left top;
      }

      .media__button {
        display: grid;
        place-items: center;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(25%, -25%);
        background-color: var(--gray-light-2);
        padding: 0.25rem;
        border-radius: 50%;
        box-shadow: 0 0.188rem 0.25rem rgba(0, 0, 0, 0.05);
      }

      .media__image {
        width: 100%;
        border-radius: 0.5rem;
      }
    `}</style>
  </>
)

export default Media

import Image from 'next/image'
import { motion } from 'framer-motion'

interface MessageEmptyProps {
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6
}

const MessageEmpty = ({ headingLevel = 2 }: MessageEmptyProps) => {
  const Heading = `h${headingLevel}` as keyof JSX.IntrinsicElements

  return (
    <>
      <motion.section
        className="message-empty"
        initial={{ scale: 0.75, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
      >
        <Image
          src="/assets/images/empty-box.svg"
          alt="Empty"
          width={150}
          height={150}
        />
        <Heading className="message-empty__title">Empty</Heading>
      </motion.section>
      <style jsx>{`
        :global(.message-empty) {
          display: grid;
          place-items: center;
          padding: 2rem;
        }

        .message-empty__title {
          margin-top: 0.5rem;
          font-size: 2rem;
          letter-spacing: 0.25rem;
          font-family: var(--font-secondary);
          color: var(--gray-4);
        }
      `}</style>
    </>
  )
}

export default MessageEmpty

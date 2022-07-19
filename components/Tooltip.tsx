import type { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRef } from 'react'
import useWindowEvent from 'hooks/useWindowEvent'
import resetButton from 'styles/resetButton'

interface ToolTipProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

const ToolTip = ({ isOpen, onClose, children }: ToolTipProps) => {
  const tooltip = useRef<HTMLUListElement>(null)

  const handleClick = (e: Event) => {
    const target = e.target as HTMLElement

    if (
      tooltip.current?.contains(target) &&
      !target.closest('a[href],button:not(:disabled)')
    )
      return

    onClose()
  }

  useWindowEvent('click', isOpen ? handleClick : undefined)

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="tooltip"
            ref={tooltip}
          >
            {children}
          </motion.ul>
        )}
      </AnimatePresence>
      <style jsx>{resetButton}</style>
      <style jsx>{`
        :global(.tooltip) {
          position: absolute;
          top: calc(var(--header-height) + 0.481rem);
          right: 2.313rem;
          display: grid;
          grid-template-columns: 1fr;
          grid-auto-rows: 2.447rem;
          gap: 0.5rem;
          background-color: #fff;
          list-style: none;
          width: 12rem;
          margin-top: 0;
          margin-bottom: 0;
          padding: 0.954rem 0.874rem;
          color: var(--gray-3);
          border: 0.063rem solid var(--gray-light-2);
          border-radius: 0.75rem;
          transform-origin: top right;
          box-shadow: 0 0.188rem 0.25rem rgba(0, 0, 0, 0.05);
        }
      `}</style>
    </>
  )
}

export default ToolTip

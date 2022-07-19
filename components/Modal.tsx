import type { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FocusLock from 'react-focus-lock'

import useWindowKeydownEventKey from 'hooks/useWindowKeydownEventKey'

interface ModalProps {
  isOpen: boolean
  ariaLabelledBy?: string
  onClose?: () => void
  children: ReactNode
}

const Modal = ({ isOpen, ariaLabelledBy, onClose, children }: ModalProps) => {
  useWindowKeydownEventKey('Escape', onClose)

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <FocusLock>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              role="dialog"
              className="modal"
              aria-modal="true"
              aria-labelledby={ariaLabelledBy}
            >
              {children}
            </motion.div>
          </FocusLock>
        )}
      </AnimatePresence>
      <style jsx>{`
        :global(.modal) {
          position: fixed;
          top: 0;
          left: 0;
          display: grid;
          place-items: center;
          background-color: rgba(0, 0, 0, 0.1);
          width: 100%;
          height: 100%;
          z-index: 10000;
        }
      `}</style>
      <style jsx>{`
        :global(body) {
          ${isOpen ? 'overflow: hidden' : ''};
          ${isOpen ? 'max-height: 100vh' : ''};
        }
      `}</style>
    </>
  )
}

export default Modal

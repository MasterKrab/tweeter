import type { MouseEventHandler, ReactNode } from 'react'
import { motion } from 'framer-motion'

interface HeaderRightLayoutProps {
  children: ReactNode
  onClick?: MouseEventHandler
  ariaLabel?: string
  ariaLabelledBy?: string
}

const HeaderRightLayout = ({
  onClick,
  ariaLabel,
  ariaLabelledBy,
  children,
}: HeaderRightLayoutProps) => (
  <motion.section
    className="header-right-layout"
    initial={{ scale: 0.75, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    onClick={onClick}
    aria-label={ariaLabel}
    aria-labelledby={ariaLabelledBy}
  >
    {children}
  </motion.section>
)

export default HeaderRightLayout

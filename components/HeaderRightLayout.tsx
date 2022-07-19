import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface HeaderRightLayoutProps {
  children: ReactNode
  ariaLabel?: string
  ariaLabelledBy?: string
}

const HeaderRightLayout = ({
  ariaLabel,
  ariaLabelledBy,
  children,
}: HeaderRightLayoutProps) => (
  <motion.section
    className="header-right-layout"
    initial={{ scale: 0.75, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    aria-label={ariaLabel}
    aria-labelledby={ariaLabelledBy}
  >
    {children}
  </motion.section>
)

export default HeaderRightLayout

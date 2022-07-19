import { useState } from 'react'
import useWindowEvent from 'hooks/useWindowEvent'

const useIsHoldingClick = () => {
  const [isHoldingClick, setIsHoldingClick] = useState(false)

  useWindowEvent('mousedown', () => setIsHoldingClick(true))
  useWindowEvent('mouseup', () => setIsHoldingClick(false))

  return isHoldingClick
}

export default useIsHoldingClick

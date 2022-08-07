import { useState, useEffect } from 'react'
import getIsGecko from 'utils/getIsGecko'

const useIsGecko = () => {
  const [isGecko, setIsGecko] = useState<boolean | null>(null)

  useEffect(() => setIsGecko(getIsGecko()), [])

  return isGecko
}

export default useIsGecko

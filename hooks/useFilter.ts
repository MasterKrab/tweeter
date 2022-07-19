import { useState, useEffect } from 'react'
import useIsMounted from 'hooks/useIsMounted'

const useFilter = <T>(defaultFilter: T, loadData: (filter: T) => void) => {
  const isMounted = useIsMounted()
  const [filter, setFilter] = useState<T>(defaultFilter)

  useEffect(() => {
    isMounted && loadData(filter)
  }, [filter])

  return {
    filter,
    handleChangeFilter: (newFilter: T) => {
      setFilter(newFilter)
    },
  }
}

export default useFilter
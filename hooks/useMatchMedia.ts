import { useState, useEffect } from 'react'

const useMatchMedia = (query: string) => {
  const [matches, setMatches] = useState<boolean | null>(null)

  useEffect(() => {
    if (!window.matchMedia || !query) return

    const mediaQueryList = window.matchMedia(query)

    setMatches(!!mediaQueryList.matches)

    const listener = (event: MediaQueryListEvent) => setMatches(!!event.matches)

    mediaQueryList.addEventListener('change', listener)

    return () => mediaQueryList.removeEventListener('change', listener)
  }, [query])

  return matches
}

export default useMatchMedia

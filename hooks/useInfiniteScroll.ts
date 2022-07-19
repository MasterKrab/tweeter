import { useState, useRef, useEffect } from 'react'

const useInfiniteScroll = (
  onIntersect?: () => void,
  active: boolean = true
) => {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const dump = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!dump.current || !onIntersect || !active) return

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      const isSomeIntersecting = entries.some(
        ({ isIntersecting }) => isIntersecting
      )

      if (!isSomeIntersecting) return setIsIntersecting(false)

      if (isIntersecting) return

      setIsIntersecting(true)
      onIntersect()
    }

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    })

    observer.observe(dump.current!)

    return () => {
      observer.disconnect()
    }
  }, [dump.current, onIntersect])

  return dump
}
export default useInfiniteScroll

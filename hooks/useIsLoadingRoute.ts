import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

const useIsLoadingRoute = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const start = () => setIsLoading(true)
    const end = () => setIsLoading(false)

    router.events.on('routeChangeStart', start)
    router.events.on('routeChangeComplete', end)
    router.events.on('routeChangeError', end)

    return () => {
      router.events.off('routeChangeStart', start)
      router.events.off('routeChangeComplete', start)
      router.events.off('routeChangeError', end)
    }
  }, [router.events])

  return isLoading
}

export default useIsLoadingRoute

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const PropressBar = () => {
  const [progress, setProgress] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const handleStart = () => setProgress(35)

    const handleEnd = () => setProgress(100)

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleEnd)
    router.events.on('routeChangeError', handleEnd)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleEnd)
      router.events.off('routeChangeError', handleEnd)
    }
  }, [router])

  useEffect(() => {
    if (progress === 100) {
      const interval = setTimeout(() => setProgress(0), 1000)

      return () => clearTimeout(interval)
    } else if (progress > 0 && progress < 100) {
      const interval = setTimeout(() => {
        progress > 50 ? setProgress(progress + 0.25) : setProgress(progress + 1)
      }, 100)

      return () => clearTimeout(interval)
    }
  }, [progress])

  return (
    <>
      <div
        className="progressbar"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin="0"
        aria-valuemax="100"
        // @ts-ignore
        progress={parseInt(progress)}
        aria-label="Cargando"
        aria-hidden={progress === 0}
      />
      <style jsx>{`
        .progressbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 0.225rem;
          z-index: 10000000;
        }

        .progressbar::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          background-color: var(--blue);
          height: 100%;
          transition: width 0.25s ease-in-out, opacity 0.15s ease-in-out;
        }
      `}</style>
      <style jsx>{`
        .progressbar::before {
          opacity: ${progress === 0 ? 0 : 1};
          width: ${progress === 0 ? 0 : `${progress}%`};
        }
      `}</style>
    </>
  )
}

export default PropressBar

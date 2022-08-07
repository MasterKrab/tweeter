import { useState, useRef } from 'react'
import useWindowEvent from 'hooks/useWindowEvent'
import useMatchMedia from 'hooks/useMatchMedia'
import useIsHoldingClick from 'hooks/useIsHoldingClick'
import useIsMounted from 'hooks/useIsMounted'
import useIsGecko from 'hooks/useIsGecko'

const CustomCursor = () => {
  const [[x, y], setPosition] = useState([-500, -500])
  const [isPointer, setPointer] = useState(false)
  const isTouch = useMatchMedia('(pointer: coarse)')
  const isHoldingClick = useIsHoldingClick()
  const isMounted = useIsMounted()
  const isGecko = useIsGecko()

  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = ({ target, pageX, pageY }: MouseEvent) => {
    if (!containerRef.current) return

    const { offsetWidth, offsetHeight } = containerRef.current

    setPosition([pageX - offsetWidth / 2, pageY - offsetHeight / 2])

    if (!target) return

    const pointer = (target as HTMLElement).closest(
      '[data-cursor-pointer=""],[data-cursor-pointer="true"],a[href]'
    )

    setPointer(!!pointer)
  }

  useWindowEvent('mousemove', isTouch ? undefined : handleMouseMove)

  const scale = isHoldingClick ? 0.9 : isPointer ? 1.3 : 1

  return (
    <>
      {isMounted && (
        <div
          className="custom-cursor"
          ref={containerRef}
          style={
            isGecko
              ? { top: `${y}px`, left: `${x}px` }
              : { transform: `translate(${x}px, ${y}px)` }
          }
        />
      )}
      <style jsx>{`
        .custom-cursor {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1000000;
          border: 3px solid var(--blue);
          border-radius: 50%;
          pointer-events: none;
          transition: width 0.2s, height 0.2s, transform 0.05s;
          box-shadow: 0 0 0 0.2rem rgba(51, 51, 51, 0.25);
        }

        .custom-cursor::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          background-color: var(--gray-4);
          width: 25%;
          height: 25%;
          border-radius: 50%;
          transform: translate(-50%, -50%);
        }

        :global(*) {
          cursor: none;
        }
      `}</style>
      <style jsx>{`
        .custom-cursor {
          display: ${isTouch ? 'none' : 'block'};
          width: calc(1.5rem * ${scale});
          height: calc(1.5rem * ${scale});
          opacity: ${isPointer ? 0.7 : 1};
        }
      `}</style>
    </>
  )
}

export default CustomCursor

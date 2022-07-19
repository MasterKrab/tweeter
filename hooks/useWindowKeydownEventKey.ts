import useWindowEvent from 'hooks/useWindowEvent'

const useWindowKeydownEventKey = (
  key: string,
  handler?: (this: Window, event: KeyboardEvent) => void
) => {
  const handleKeyDown = (event: KeyboardEvent) => {
    event.key === key && handler!.call(window, event)
  }

  useWindowEvent('keydown', handler && handleKeyDown)
}

export default useWindowKeydownEventKey

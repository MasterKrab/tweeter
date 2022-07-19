import { useState, DragEvent } from 'react'

const useDropZone = (onChange: (file: File) => void, disabled?: boolean) => {
  const [isDragOver, setIsDragOver] = useState(false)

  const onDrop = (e: DragEvent) => {
    if (!e.dataTransfer || disabled) return

    e.preventDefault()

    onChange(e.dataTransfer.files[0])
  }

  const onDragOver = (e: DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const onDragLeave = (e: DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  return {
    isDragOver,
    events: {
      onDrop,
      onDragOver,
      onDragLeave,
    },
  }
}

export default useDropZone

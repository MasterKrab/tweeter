import { KeyboardEvent } from 'react'

const createHandleKeyDownSubmit =
  (submit: Function) => (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== 'Enter' || e.shiftKey) return

    e.preventDefault()
    submit()
  }

export default createHandleKeyDownSubmit

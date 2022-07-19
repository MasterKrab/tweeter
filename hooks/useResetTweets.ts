import { useState, useEffect } from 'react'
import { useAppDispatch } from 'app/store'
import { resetTweets } from 'reducers/tweetsSlice'

const useResetTweets = () => {
  const [isReseted, setIsReseted] = useState(false)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(resetTweets())
    setIsReseted(true)
  }, [])

  return isReseted
}

export default useResetTweets

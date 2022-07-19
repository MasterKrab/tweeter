import { useState, useEffect } from 'react'

const usePromise = <Type>(
  promiseFunction: () => Promise<Type>
): { result: Type | null; isLoading: boolean; error: any } => {
  const [result, setResult] = useState<Type | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    if (!promiseFunction) return

    setIsLoading(true)

    promiseFunction()
      .then(setResult)
      .catch(setError)
      .finally(() => setIsLoading(false))
  }, [promiseFunction])

  return { result, isLoading, error }
}

export default usePromise

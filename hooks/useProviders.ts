import { getProviders } from 'next-auth/react'
import usePromise from 'hooks/usePromise'

const useProviders = () => {
  const providers = usePromise(getProviders)

  return providers.result
}

export default useProviders

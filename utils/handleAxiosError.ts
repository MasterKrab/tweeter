import axios from 'axios'

const handleAxiosError = (error: unknown) => {
  const normalizedError = axios.isAxiosError(error)
    ? typeof error?.response?.data === 'string'
      ? error?.response?.data
      : error.message
    : 'Something went wrong'

  throw new Error(normalizedError)
}

export default handleAxiosError

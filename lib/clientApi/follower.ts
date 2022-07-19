import axios from 'axios'
import handleAxiosError from 'utils/handleAxiosError'

export const createFollower = async (userId: string) => {
  try {
    await axios.post('/api/follow', {
      userId,
    })
  } catch (error) {
    return handleAxiosError(error)
  }
}

export const deleteFollower = async (userId: string) => {
  try {
    await axios.delete('/api/follow', {
      data: {
        userId,
      },
    })
  } catch (error) {
    return handleAxiosError(error)
  }
}

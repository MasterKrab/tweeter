import axios from 'axios'
import handleAxiosError from 'utils/handleAxiosError'

const deleteUser = async () => {
  try {
    await axios.delete('/api/user')
  } catch (error) {
    return handleAxiosError(error)
  }
}

export default deleteUser

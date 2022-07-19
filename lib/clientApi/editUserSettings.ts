import type EditUserSettings from 'types/edit-user-settings'
import type UserSettings from 'types/user-settings'
import axios from 'axios'
import toFormData from 'utils/toFormData'
import handleAxiosError from 'utils/handleAxiosError'

const editUserSettings = async (data: EditUserSettings) => {
  try {
    const response = await axios.post<UserSettings>(
      '/api/user',
      toFormData(data)
    )

    return response.data
  } catch (error) {
    return handleAxiosError(error)
  }
}

export default editUserSettings

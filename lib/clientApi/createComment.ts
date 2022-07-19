import type { tweetId } from 'reducers/tweetsSlice'
import type { NewComment } from 'types/new-comment'
import type Comment from 'types/comment'
import axios from 'axios'
import toFormData from 'utils/toFormData'
import handleAxiosError from 'utils/handleAxiosError'

const createComment = async ({
  id,
  data,
}: {
  id: tweetId
  data: NewComment
}) => {
  try {
    const response = await axios.post<Comment>('/api/comment', toFormData(data))

    return { id, comment: response.data }
  } catch (error) {
    return handleAxiosError(error)
  }
}

export default createComment

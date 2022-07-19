import * as jf from 'joiful'

class CreateFollow {
  @jf.string().trim().min(1).required()
  userId!: string
}

export default CreateFollow

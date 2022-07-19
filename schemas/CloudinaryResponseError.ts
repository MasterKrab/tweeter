import * as jf from 'joiful'

class Headers {
  @jf.string()
  'Content-Type'!: string

  @jf.string()
  'User-Agent'!: string

  @jf.string()
  'Content-Length'!: string
}

class Error {
  @jf.string()
  message!: string

  @jf.number()
  http_code!: number
}

class RequestOptions {
  @jf.string()
  protocol!: string

  @jf.boolean()
  slashes!: boolean

  @jf.string()
  auth!: string

  @jf.string()
  host!: string

  @jf.string().allow(null)
  port!: string | null

  @jf.string()
  hostname!: string

  @jf.string()
  hash!: string | null

  @jf.string().allow(null)
  search!: string | null

  @jf.string().allow(null)
  query!: string | null

  @jf.string()
  pathname!: string

  @jf.string()
  path!: string

  @jf.string()
  href!: string

  @jf.string()
  method!: string

  @jf.object()
  headers!: Headers
}

class CloudinaryResponseError {
  @jf.object()
  request!: RequestOptions

  @jf.string()
  query_params!: string

  @jf.object()
  error!: Error
}

export default CloudinaryResponseError

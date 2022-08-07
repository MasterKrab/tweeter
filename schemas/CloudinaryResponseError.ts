import * as jf from 'joiful'

class Headers {
  @jf.string()
  'Content-Type'!: string

  @jf.string()
  'User-Agent'!: string

  @jf.number()
  'Content-Length'!: number
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

  @jf.string().allow(null)
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
  request_options!: RequestOptions

  @jf.string().allow('')
  query_params!: string

  @jf.object()
  error!: Error
}

export default CloudinaryResponseError

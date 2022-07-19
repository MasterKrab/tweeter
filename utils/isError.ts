interface Error {
  message: string
}

const isError = (error: unknown): error is Error => error instanceof Error

export default isError

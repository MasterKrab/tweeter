const convertToNumbers = (
  ...args: string[] | number[]
): { result?: number[]; error?: boolean } => {
  try {
    const result = args.map((arg) => {
      const number = Number(arg)

      if (isNaN(number)) throw new Error('Not a number')

      return number
    })

    return { result, error: false }
  } catch (error) {
    if (error === 'Not a number') return { error: true }

    throw error
  }
}

export default convertToNumbers

const kFormatter = (number: number) => {
  const formattedNumber = number.toString()

  return number < 1000 ? formattedNumber : `${formattedNumber.slice(0, -3)}k`
}

export default kFormatter

const removeNoAlphaNumeric = (text: string) => text.replace(/[^a-zA-Z ]/g, '')

export default removeNoAlphaNumeric

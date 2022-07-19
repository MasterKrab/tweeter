import IMAGE_FORMATS from 'lib/imageFormats'

const imageFormats = new Set(IMAGE_FORMATS)

const validateImageFormat = ({ type }: File) => imageFormats.has(type)

export default validateImageFormat

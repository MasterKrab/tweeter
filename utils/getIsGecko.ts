const getIsGecko = () =>
  typeof navigator !== 'undefined' && navigator.userAgent.includes('Gecko/')

export default getIsGecko

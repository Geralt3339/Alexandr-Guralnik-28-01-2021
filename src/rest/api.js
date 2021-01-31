const Api = async (url, options = {}) => {
  const request = await fetch(`http://dataservice.accuweather.com/${url}`, options)
  return request
}

export default Api

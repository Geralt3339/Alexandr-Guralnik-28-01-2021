const Api = async (url) => {
  const request = await fetch(`http://dataservice.accuweather.com/${url}`)
  return request
}

export default Api

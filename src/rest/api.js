export const Api = async (url, options = {}) => {
  const request = await fetch(`http://dataservice.accuweather.com/${url}`, options)
  return request
}

export const apikey = '3GMrbJnT3DWtScXewJtEuJ3Vm4HvkOeP'
// export const apikey = '5B2X0vtpOp84BGI5GxudvGAcdx3UXs0U'

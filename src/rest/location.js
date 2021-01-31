import Api from './api'

export const autocompleteSearch = (q) => {
  const response = Api(`locations/v1/cities/autocomplete?apikey=5B2X0vtpOp84BGI5GxudvGAcdx3UXs0U&q=${q}`)
  return response
}

export const geopositionSearch = (q) => {
  const response = Api(`locations/v1/cities/geoposition/search?apikey=5B2X0vtpOp84BGI5GxudvGAcdx3UXs0U&q=${q}`)
  return response
}

export const searchByKey = (locationKey) => {
  const response = Api(`locations/v1/${locationKey}?apikey=5B2X0vtpOp84BGI5GxudvGAcdx3UXs0U`)
  return response
}

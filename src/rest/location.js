import { Api, apikey } from './api'

export const autocompleteSearch = (q) => {
  const response = Api(`locations/v1/cities/autocomplete?apikey=${apikey}&q=${q}`)
  return response
}

export const geopositionSearch = (q) => {
  const response = Api(`locations/v1/cities/geoposition/search?apikey=${apikey}&q=${q}`)
  return response
}

export const searchByKey = (locationKey) => {
  const response = Api(`locations/v1/${locationKey}?apikey=${apikey}`)
  return response
}

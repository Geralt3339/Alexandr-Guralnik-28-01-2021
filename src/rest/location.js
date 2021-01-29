import Api from './api'

export const autocompleteSearch = (q) => {
  const response = Api('locations/v1/cities/autocomplete', {
    apikey: '5B2X0vtpOp84BGI5GxudvGAcdx3UXs0U',
    language: 'en-us',
    q
  })
  return response
}

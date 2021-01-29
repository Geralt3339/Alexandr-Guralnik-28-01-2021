import Api from './api'

export const currentConditions = (locationKey) => {
  const response = Api(`currentconditions/v1/${locationKey}?apikey=5B2X0vtpOp84BGI5GxudvGAcdx3UXs0U`)
  return response
}

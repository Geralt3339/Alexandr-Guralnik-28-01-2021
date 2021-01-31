import Api from './api'

export const currentConditions = (locationKey) => {
  const response = Api(`currentconditions/v1/${locationKey}?apikey=5B2X0vtpOp84BGI5GxudvGAcdx3UXs0U`)
  return response
}

export const fiveDaysForecast = (locationKey, isImperial) => {
  const response = Api(`forecasts/v1/daily/5day/${locationKey}?apikey=5B2X0vtpOp84BGI5GxudvGAcdx3UXs0U&metric=${isImperial}`)
  return response
}

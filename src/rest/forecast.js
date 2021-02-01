import Api from './api'
import { apikey } from '../main'

export const currentConditions = (locationKey) => {
  const response = Api(`currentconditions/v1/${locationKey}?apikey=${apikey}`)
  return response
}

export const fiveDaysForecast = (locationKey, isImperial) => {
  const response = Api(`forecasts/v1/daily/5day/${locationKey}?apikey=${apikey}&metric=${isImperial}`)
  return response
}

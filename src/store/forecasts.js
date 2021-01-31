export const forecasts = {
  state: {
    currentLocationWeather: {},
    fiveDaysForecast: {},
    lastUpdate: null
  },

  getters: {
    getCurrentLocationWeather: (state) => state.currentLocationWeather,
    getFiveDaysForecast: (state) => state.fiveDaysForecast,
    getLastUpdate: (state) => state.lastUpdate
  },

  mutations: {
    setCurrentLocationWeather: (state, data) => {
      state.currentLocationWeather = {
        precipitationType: data.PrecipitationType,
        weatherText: data.WeatherText,
        weatherIcon: data.WeatherIcon,
        temperature: {
          fahrenheit: `${data.Temperature.Imperial.Value} F`,
          celcius: `${Math.round(data.Temperature.Metric.Value)} C`
        }
      }
    },
    setFiveDaysForecast: (state, data) => {
      state.fiveDaysForecast = data
      state.lastUpdate = new Date()
    }
  },

  actions: {
    currentLocationWeather: ({ commit }, data) => { commit('setCurrentLocationWeather', data) },
    currentFiveDaysForecast: ({ commit }, data) => { commit('setFiveDaysForecast', data) }
  }
}

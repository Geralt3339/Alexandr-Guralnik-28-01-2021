export const forecasts = {
  state: {
    currentLocationWeather: {},
    fiveDaysForecast: {}
  },

  getters: {
    getCurrentLocationWeather: (state) => state.currentLocationWeather,
    getFiveDaysForecast: (state) => state.fiveDaysForecast
  },

  mutations: {
    setCurrentLocationWeather: (state, data) => {
      state.currentLocationWeather = {
        precipitationType: data.PrecipitationType,
        weatherText: data.WeatherText,
        weatherIcon: data.WeatherIcon,
        temperature: {
          fahrenheit: `${data.Temperature.Imperial.Value} F`,
          celcius: `${data.Temperature.Metric.Value} C`
        }
      }
    },
    setFiveDaysForecast: (state, data) => { state.fiveDaysForecast = data }
  },

  actions: {
    currentLocationWeather: ({ commit }, data) => { commit('setCurrentLocationWeather', data) },
    currentFiveDaysForecast: ({ commit }, data) => { commit('setFiveDaysForecast', data) }
  }
}

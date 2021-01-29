export const main = {
  state: {
    theme: {
      dark: false
    },
    appbar: {
      links: [
        {
          name: 'Home',
          path: '/'
        },
        {
          name: 'Favorites',
          path: '/favorites'
        }
      ]
    },
    currentLocationWeather: {
      precipitationType: '',
      weatherText: '',
      weatherIcon: null,
      temperature: {
        fahrenheit: null,
        celcius: null
      }
    }
  },

  getters: {
    getCurrentTheme: (state) => state.theme.dark,
    getAppbarLinks: (state) => state.appbar.links,
    getCurrentLocationWeather: (state) => state.currentLocationWeather
  },

  mutations: {
    setTheme: (state, data) => {
      state.theme.dark = data
    },
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
    }
  },

  actions: {
    currentTheme: ({ commit }, data) => { commit('setTheme', data) },
    currentLocationWeather: ({ commit }, data) => { commit('setCurrentLocationWeather', data) }
  }
}

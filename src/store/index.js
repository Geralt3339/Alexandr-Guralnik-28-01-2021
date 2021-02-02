export const main = {
  state: {
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
    daysOfWeek: {
      0: 'Sunday',
      1: 'Monday',
      2: 'Tuesday',
      3: 'Wednesday',
      4: 'Thursday',
      5: 'Friday',
      6: 'Saturday'
    },
    configuration: {
      unitSystem: {
        isMetric: true
      },
      theme: {
        dark: false
      }
    },
    reloadRequired: false,
    isLoaded: {
      status: false,
      msg: 'Please wait, data is loading..'
    }
  },

  getters: {
    getCurrentTheme: (state) => state.configuration.theme.dark,
    getAppbarLinks: (state) => state.appbar.links,
    getDaysOfWeek: (state) => state.daysOfWeek,
    getUnitSystem: (state) => state.configuration.unitSystem.isMetric,
    reload: (state) => state.reloadRequired,
    isLoaded: (state) => state.isLoaded
  },

  mutations: {
    setTheme: (state, data) => { state.configuration.theme.dark = data },
    setUnitSystem: (state, data) => { state.configuration.unitSystem.isMetric = data },
    setReloadRequired: (state, data) => { state.reloadRequired = data },
    setIsLoaded: (state, data) => { state.isLoaded = data }
  },

  actions: {
    currentTheme: ({ commit }, data) => { commit('setTheme', data) },
    unitSystem: ({ commit }, data) => { commit('setUnitSystem', data) },
    reloadToggle: ({ commit }, data) => { commit('setReloadRequired', data) },
    isLoadedToggle: ({ commit }, data) => { commit('setIsLoaded', data) }
  }
}

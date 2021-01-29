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
    daysOfWeek: {
      0: 'Sunday',
      1: 'Monday',
      2: 'Tuesday',
      3: 'Wednesday',
      4: 'Thursday',
      5: 'Friday',
      6: 'Saturday'
    }
  },

  getters: {
    getCurrentTheme: (state) => state.theme.dark,
    getAppbarLinks: (state) => state.appbar.links,
    getDaysOfWeek: (state) => state.daysOfWeek
  },

  mutations: {
    setTheme: (state, data) => {
      state.theme.dark = data
    }
  },

  actions: {
    currentTheme: ({ commit }, data) => { commit('setTheme', data) }
  }
}

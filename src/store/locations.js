export const locations = {
  state: {
    currentLocation: {
      key: null,
      position: {
        latitude: null,
        longitude: null
      },
      name: ''
    },
    favoriteLocations: []
  },

  getters: {
    getCurrentLocation: (state) => state.currentLocation,
    getFavoriteLocations: (state) => state.favoriteLocations
  },

  mutations: {
    setCurrentLocation: (state, data) => { state.currentLocation = data },
    setFavoriteLocations: (state, data) => { state.favoriteLocations = data }
  },

  actions: {
    currentLocation: ({ commit }, data) => { commit('setCurrentLocation', data) },
    addFavoriteLocation: ({ commit, state }, data) => {
      const favorites = state.favoriteLocations
      favorites.push(data)
      commit('setFavoriteLocations', favorites)
    },
    removeFavoriteLocation: ({ commit, state }, data) => {
      const favorites = state.favoriteLocations.filter(location => location.key !== data)
      commit('setFavoriteLocations', favorites)
    }
  }
}

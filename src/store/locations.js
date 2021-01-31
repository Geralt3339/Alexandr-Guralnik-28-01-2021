export const locations = {
  state: {
    currentLocation: {
      key: null,
      position: {
        latitude: null,
        longitude: null
      },
      name: ''
    }
  },

  getters: {
    getCurrentLocation: (state) => state.currentLocation
  },

  mutations: {
    setCurrentLocation: (state, data) => { state.currentLocation = data }
  },

  actions: {
    currentLocation: ({ commit }, data) => { commit('setCurrentLocation', data) }
  }
}

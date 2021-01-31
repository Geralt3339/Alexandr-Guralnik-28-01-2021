import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import {main} from '../store/index'
import {forecasts} from '../store/forecasts'
import {locations} from '../store/locations'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    main, forecasts, locations
  },
  plugins: [createPersistedState()]
})

export default store

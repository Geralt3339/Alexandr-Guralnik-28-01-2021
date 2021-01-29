import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import {main} from '../store/index'
import {forecasts} from '../store/forecasts'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    main, forecasts
  },
  plugins: [createPersistedState()]
})

export default store

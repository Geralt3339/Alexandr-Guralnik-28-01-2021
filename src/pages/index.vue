<template>
  <v-container class="pa-0">
    <v-container class="pb-0 mb-0">
      <v-row>
        <v-col cols="10" offset="1" md="6" offset-md="3">
          <search-field-component />
        </v-col>
      </v-row>
    </v-container>
    <forecast />
    <v-btn @click="getCurrentConditions">Test request</v-btn>
  </v-container>
</template>

<script>
import { currentConditions, fiveDaysForecast } from '../rest/forecast'
import { bus } from '../plugins/eventEmitter'

import SearchFieldComponent from '../components/HomePage/searchField.component.vue'
import Forecast from '../components/HomePage/Forecast/forecast.component.vue'

export default {
  name: 'Home',
  components: {SearchFieldComponent, Forecast},
  data () {
    return {
    }
  },

  methods: {
    getCurrentConditions () {
      currentConditions('215854').then(res => {
        return res.json()
      }).then((json) => {
        this.$store.dispatch('currentLocationWeather', json[0])
        console.log(json[0])
      }).then(() => {
        fiveDaysForecast('215854').then(res => {
          return res.json()
        }).then(json => {
          console.log(json)
          this.$store.dispatch('currentFiveDaysForecast', json)
        })
      }).finally(() => {
        bus.$emit('current-weather-update')
      })
    }
  }
}
</script>

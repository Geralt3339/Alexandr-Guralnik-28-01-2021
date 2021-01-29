<template>
  <v-card style="height: 100%">
    <v-toolbar dense>
      <v-toolbar-title>Forecast</v-toolbar-title>
    </v-toolbar>
    <v-parallax :src="require('../../../assets/clouds.jpg')" class="parallax-justify-content-fix" :height="parallaxHeight">
      <v-row align="center">
        <v-col cols="12" sm="6">
          <today :temperature="currentWeather.temperature.celcius" :weatherIcon="currentWeather.weatherIcon" />
        </v-col>
        <v-col cols="12" sm="6">
          <favorites />
        </v-col>
      </v-row>
      <v-spacer />
      <v-row align="center" class="mb-2 mt-2">
        <v-col cols="12">
          <p class="text-center text-h2">{{ currentWeather.weatherText }}</p>
        </v-col>
      </v-row>
      <five-days-forecast />
    </v-parallax>
  </v-card>
</template>

<script>
import { bus } from '../../../plugins/eventEmitter'

import Today from './today/today.component'
import Favorites from './favorites/favorites.component'
import FiveDaysForecast from './fiveDaysForecast/fiveDaysForecast.component'

export default {
  components: {
    Today, Favorites, FiveDaysForecast
  },

  data () {
    return {
      currentWeather: null
    }
  },

  computed: {
    parallaxHeight () {
      if (this.$vuetify.breakpoint.name === 'xs') {
        return '900px'
      } else {
        return '600px'
      }
    }
  },

  created () {
    this.currentWeather = this.$store.getters.getCurrentLocationWeather
    bus.$on('current-weather-update', () => {
      this.currentWeather = this.$store.getters.getCurrentLocationWeather
    })
  },

  beforeDestroy () {
    bus.$off('current-weather-update')
  }
}
</script>

<style>
.parallax-justify-content-fix .v-parallax__content {
  justify-content: space-between!important;
}
</style>

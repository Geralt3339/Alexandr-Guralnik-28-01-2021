<template>
  <v-card style="height: 100%">
    <v-toolbar dense>
      <v-toolbar-title>Forecast</v-toolbar-title>
    </v-toolbar>
    <v-parallax :src="require('../../../assets/clouds.jpg')" :class="isLoaded ? 'parallax-justify-content-fix' : ''" :height="parallaxHeight">
      <template v-if="!isLoaded">
        <h1 class="text-center text-border">Please wait</h1>
      </template>
      <template v-else>
        <v-row align="center">
          <v-col cols="12" sm="6">
            <today class="text-border" :temperature="currentWeather.temperature ? currentWeather.temperature.celcius : null" :weatherIcon="currentWeather.weatherIcon ? currentWeather.weatherIcon : null" />
          </v-col>
          <v-col cols="12" sm="6">
            <favorites />
          </v-col>
        </v-row>
        <v-spacer />
        <v-row align="center" class="mb-2 mt-2">
          <v-col cols="12">
            <p class="text-center text-h2 text-border">{{ currentWeather.weatherText }}</p>
          </v-col>
        </v-row>
        <five-days-forecast :forecastData="fiveDaysForecast.DailyForecasts" />
      </template>
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
      currentWeather: null,
      fiveDaysForecast: {},
      isLoaded: false
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
    this.isLoaded = !!this.$store.getters.getCurrentLocationWeather.temperature
    this.currentWeather = this.$store.getters.getCurrentLocationWeather
    this.fiveDaysForecast = this.$store.getters.getFiveDaysForecast
    bus.$on('current-weather-update', () => {
      this.currentWeather = this.$store.getters.getCurrentLocationWeather
      this.fiveDaysForecast = this.$store.getters.getFiveDaysForecast
      this.isLoaded = true
    })
    console.log(this.$store.getters.getFiveDaysForecast)
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

.text-border {
  text-shadow: -0.5px 0 black, 0 0.5px black, 0.5px 0 black, 0 -0.5px black;
}
</style>

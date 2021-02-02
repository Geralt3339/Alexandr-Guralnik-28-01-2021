<template>
  <v-card style="height: 100%">
    <v-toolbar dense>
      <v-toolbar-title>Forecast</v-toolbar-title>
    </v-toolbar>
    <template v-if="$store.getters.isLoaded.status">
      <v-parallax :src="require('../../../assets/clouds.jpg')" class="parallax-justify-content-fix" :height="parallaxHeight">
        <v-row align="center">
          <v-col cols="12" sm="6">
            <today v-if="currentLocation.name" class="text-border" :location="currentLocation" :temperature="currentWeather.temperature ? temperature : null" :weatherIcon="currentWeather.weatherIcon ? currentWeather.weatherIcon : null" />
          </v-col>
          <v-col cols="12" sm="6">
            <favorites :location="currentLocation" :weather="currentWeather" />
          </v-col>
        </v-row>
        <v-spacer />
        <v-row align="center" class="mb-2 mt-2">
          <v-col cols="12">
            <p class="text-center text-h2 text-border">{{ currentWeather.weatherText }}</p>
          </v-col>
        </v-row>
        <template v-if="fiveDaysForecast.DailyForecasts">
          <five-days-forecast :forecastData="fiveDaysForecast.DailyForecasts" />
        </template>
      </v-parallax>
    </template>
    <template v-else>
      <v-container>
        <p class="text-center ma-6 text-h4 grey--text">{{ this.$store.getters.isLoaded.msg }}</p>
      </v-container>
    </template>
  </v-card>
</template>

<script>
import { bus } from '../../../plugins/eventEmitter'
import { geopositionSearch } from '../../../rest/location'

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
      currentLocation: null,
      fiveDaysForecast: {}
    }
  },

  computed: {
    parallaxHeight () {
      if (this.$vuetify.breakpoint.name === 'xs') {
        return '900px'
      } else {
        return '600px'
      }
    },

    temperature () {
      if (!this.$store.getters.getUnitSystem) {
        return this.currentWeather.temperature.fahrenheit
      } else {
        return this.currentWeather.temperature.celcius
      }
    }
  },

  created () {
    this.currentWeather = this.$store.getters.getCurrentLocationWeather
    this.fiveDaysForecast = this.$store.getters.getFiveDaysForecast
    this.currentLocation = this.$store.getters.getCurrentLocation
    bus.$on('current-weather-update', () => {
      this.currentWeather = this.$store.getters.getCurrentLocationWeather
      this.fiveDaysForecast = this.$store.getters.getFiveDaysForecast
      this.currentLocation = this.$store.getters.getCurrentLocation
      this.$store.dispatch('isLoadedToggle', {
        status: true
      })
    })
  },

  beforeMount () {
    if (this.$store.getters.reload.isRequired) {
      bus.$emit('get-weather', this.$store.getters.reload.reloadLocationKey)
    } else if (!navigator.geolocation && !this.currentWeather.temperature) {
      this.$store.dispatch('currentLocation', {
        key: '215854',
        position: {
          latitude: 32.045,
          longitude: 34.77
        },
        name: 'Tel Aviv'
      })
      this.currentLocation = this.$store.getters.getCurrentLocation
      bus.$emit('get-weather', 215854)
    } else {
      if (!this.currentWeather.temperature) {
        navigator.geolocation.getCurrentPosition((pos) => {
          const latitude = pos.coords.latitude
          const longitude = pos.coords.longitude
          geopositionSearch(`${latitude},${longitude}`).then((res) => {
            return res.json()
          }).then(json => {
            this.$store.dispatch('currentLocation', {
              key: json.Key,
              position: {
                latitude: json.GeoPosition.Latitude,
                longitude: json.GeoPosition.Longitude
              },
              name: json.LocalizedName
            })
            this.currentLocation = this.$store.getters.getCurrentLocation
            bus.$emit('get-weather', json.Key)
          }).catch(() => {
            this.$store.dispatch('isLoadedToggle', {
              status: false,
              msg: 'Sorry, the service is currently unavailable'
            })
            bus.$emit('noti', {
              type: 'error',
              text: 'Sorry, the service is currently unavailable'
            })
          })
        },
        () => {
          bus.$emit('noti', {
            type: 'error',
            text: `Your current location is unavailable`
          })
        })
      }
    }
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

<template>
  <v-container class="pa-0">
    <v-container class="pb-0 mb-0">
      <v-row>
        <v-col cols="10" offset="1" md="6" offset-md="3">
          <autocomplete-search />
        </v-col>
      </v-row>
    </v-container>
    <forecast class="mb-12" />
  </v-container>
</template>

<script>
import { fiveDaysForecast, currentConditions } from '../rest/forecast'
import { searchByKey } from '../rest/location'
import { bus } from '../plugins/eventEmitter'

import AutocompleteSearch from '../components/HomePage/Autocomplete/autocomplete.component'
import Forecast from '../components/HomePage/Forecast/forecast.component.vue'

export default {
  name: 'Home',
  components: {Forecast, AutocompleteSearch},
  data () {
    return {
    }
  },

  created () {
    bus.$on('unit-system', () => {
      console.log('this.$store.getters.getCurrentLocation.key', this.$store.getters.getCurrentLocation.key)
      fiveDaysForecast(this.$store.getters.getCurrentLocation.key, this.$store.getters.getUnitSystem).then(res => {
        return res.json()
      }).then(json => {
        console.log(json)
        this.$store.dispatch('currentFiveDaysForecast', json)
      }).finally(() => {
        bus.$emit('current-weather-update')
      })
    })
    bus.$on('get-weather', (locationKey) => {
      searchByKey(locationKey).then(res => {
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
      }).catch(() => {
        bus.$emit('noti', {
          type: 'error',
          text: 'Sorry, the service is currently unavailable'
        })
      })
      currentConditions(locationKey).then(res => {
        return res.json()
      }).then((json) => {
        this.$store.dispatch('currentLocationWeather', json[0])
        console.log(json[0])
      }).then(() => {
        fiveDaysForecast(locationKey, this.$store.getters.getUnitSystem).then(res => {
          return res.json()
        }).then(json => {
          console.log(json)
          this.$store.dispatch('currentFiveDaysForecast', json)
        }).finally(() => {
          bus.$emit('current-weather-update')
          bus.$emit('five-days-forecast-update')
        })
      }).catch(() => {
        bus.$emit('noti', {
          type: 'error',
          text: 'Sorry, the service is currently unavailable'
        })
      })
    })
  },

  beforeMount () {
    if (this.$store.getters.getFiveDaysForecast.Headline) {
      bus.$emit('unit-system')
    }
  },

  beforeDestroy () {
    bus.$off('unit-system')
    bus.$off('get-weather')
  }
}
</script>

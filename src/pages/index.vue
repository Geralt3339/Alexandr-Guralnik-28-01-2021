<template>
  <default-layout>
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
  </default-layout>
</template>

<script>
import { fiveDaysForecast, currentConditions } from '../rest/forecast'
import { searchByKey } from '../rest/location'
import { bus } from '../plugins/eventEmitter'

import DefaultLayout from '../layouts/default'
import AutocompleteSearch from '../components/HomePage/Autocomplete/autocomplete.component'
import Forecast from '../components/HomePage/Forecast/forecast.component.vue'

export default {
  name: 'Home',
  components: {DefaultLayout, Forecast, AutocompleteSearch},
  data () {
    return {
    }
  },

  created () {
    bus.$on('unit-system', () => {
      fiveDaysForecast(this.$store.getters.getCurrentLocation.key, this.$store.getters.getUnitSystem).then(res => {
        return res.json()
      }).then(json => {
        this.$store.dispatch('currentFiveDaysForecast', json)
      }).catch(() => {
        this.$store.dispatch('isLoadedToggle', {
          status: false,
          msg: 'Sorry, the service is currently unavailable'
        })
        bus.$emit('noti', {
          type: 'error',
          text: 'Sorry, the service is currently unavailable'
        })
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
        this.$store.dispatch('isLoadedToggle', {
          status: false,
          msg: 'Sorry, the service is currently unavailable'
        })
        bus.$emit('noti', {
          type: 'error',
          text: 'Sorry, the service is currently unavailable'
        })
      }).finally(() => {
        this.$store.dispatch('reloadToggle', false)
      })
      currentConditions(locationKey).then(res => {
        return res.json()
      }).then((json) => {
        this.$store.dispatch('currentLocationWeather', json[0])
      }).then(() => {
        fiveDaysForecast(locationKey, this.$store.getters.getUnitSystem).then(res => {
          return res.json()
        }).then(json => {
          this.$store.dispatch('currentFiveDaysForecast', json)
        }).catch(() => {
          this.$store.dispatch('isLoadedToggle', {
            status: false,
            msg: 'Sorry, the service is currently unavailable'
          })
          bus.$emit('noti', {
            type: 'error',
            text: 'Sorry, the service is currently unavailable'
          })
        }).finally(() => {
          bus.$emit('current-weather-update')
          bus.$emit('five-days-forecast-update')
        })
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
    })
  },

  beforeMount () {
    if (this.$store.getters.getFiveDaysForecast.Headline) {
      bus.$emit('unit-system')
    }
  },

  beforeDestroy () {
    bus.$off('get-weather')
    bus.$off('unit-system')
  }
}
</script>

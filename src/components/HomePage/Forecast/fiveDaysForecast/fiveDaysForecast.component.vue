<template>
  <v-row class="mb-2" justify="center">
    <day v-for="(item, index) in forecastData" :dayForecast="item" :key="index" />
  </v-row>
</template>

<script>
import { bus } from '../../../../plugins/eventEmitter'

import Day from './day/day.component'

export default {
  components: {Day},

  props: {
    forecastData: {
      type: Array,
      required: true
    }
  },

  created () {
    console.log('component created, fiveDaysForecast', this.forecastData)
    bus.$on('five-days-forecast-update', () => {
      console.log('five-days-forecast-update emitted', this.forecastData)
      this.$forceUpdate()
    })
  },

  beforeDestroy () {
    bus.$off('five-days-forecast-update')
  }
}
</script>

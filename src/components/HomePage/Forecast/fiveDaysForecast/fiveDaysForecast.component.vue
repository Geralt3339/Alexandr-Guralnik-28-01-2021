<template>
  <v-row class="mb-2" justify="center">
    <day v-for="(item, index) in forecastData" :dayForecast="item" :key="index" />
  </v-row>
</template>

<script>
import Day from './day/day.component'

export default {
  components: {Day},

  props: {
    forecastData: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<template>
  <v-row class="mb-2" justify="center">
    <day v-for="index in 5" :key="index" />
  </v-row>
</template>

<script>
import Day from './day/day.component'

export default {
  components: {Day}
}
</script>

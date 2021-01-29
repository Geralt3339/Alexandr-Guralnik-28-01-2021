<template>
  <v-row justify="start">
    <v-col cols="6" sm="3">
      <v-row justify="center" class="mt-1">
        <v-img height="75px" width="75px" :src="iconURL" />
      </v-row>
    </v-col>
    <v-col cols="6" md="3">
      <p class="mt-2">
        <strong>Tel-Aviv</strong>
      </p>
      <p>{{ temperature }}</p>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    temperature: {
      type: String,
      default: 'Unknown'
    },
    weatherIcon: {
      type: Number,
      default: 0
    }
  },

  computed: {
    iconURL () {
      if (String(this.weatherIcon).length === 1) {
        return `https://developer.accuweather.com/sites/default/files/0${this.weatherIcon}-s.png`
      } else {
        return `https://developer.accuweather.com/sites/default/files/${this.weatherIcon}-s.png`
      }
    }
  }
}
</script>

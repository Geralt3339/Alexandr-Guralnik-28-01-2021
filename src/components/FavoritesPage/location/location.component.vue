<template>
  <v-col cols="6" sm="4" md="2">
    <v-card width="100%">
      <v-container class="text-center">
        <p><strong>{{ locationData.name }}</strong></p>
        <v-img :src="iconURL" />
        <p>{{ locationData.weatherText }}</p>
        <p>{{ $store.getters.getUnitSystem ? locationData.temperature.celcius : locationData.temperature.fahrenheit }}</p>
      </v-container>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: {
    locationData: {
      type: Object,
      required: true
    }
  },

  computed: {
    iconURL () {
      if (String(this.locationData.weatherIcon).length === 1) {
        return `https://developer.accuweather.com/sites/default/files/0${this.locationData.weatherIcon}-s.png`
      } else {
        return `https://developer.accuweather.com/sites/default/files/${this.locationData.weatherIcon}-s.png`
      }
    }
  },

  created () {
    console.log(this.locationData)
  }
}
</script>

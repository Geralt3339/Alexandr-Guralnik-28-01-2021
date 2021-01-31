<template>
  <v-col cols="6" sm="4" md="2">
    <v-card width="100%">
      <v-container class="text-center">
        <p>{{ dayOfWeek }}</p>
        <p>{{ dayForecast.Temperature ? `${Math.round(dayForecast.Temperature.Maximum.Value)} ${dayForecast.Temperature.Maximum.Unit}` : '' }}</p>
        <v-row class="mb-1">
          <v-img v-if="this.dayForecast.Day.Icon" :src="iconURL" />
        </v-row>
      </v-container>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: {
    dayForecast: {
      type: Object,
      default () {
        return {}
      }
    }
  },

  data () {
    return {
      daysOfWeek: {}
    }
  },

  computed: {
    dayOfWeek () {
      if (this.dayForecast.Date) {
        let day = new Date(this.dayForecast.Date)
        return this.daysOfWeek[day.getDay()]
      } else {
        return ''
      }
    },
    iconURL () {
      if (this.dayForecast.Day && String(this.dayForecast.Day.Icon).length === 1) {
        return `https://developer.accuweather.com/sites/default/files/0${this.dayForecast.Day.Icon}-s.png`
      } else {
        return `https://developer.accuweather.com/sites/default/files/${this.dayForecast.Day.Icon}-s.png`
      }
    }
  },

  created () {
    this.daysOfWeek = this.$store.getters.getDaysOfWeek
  }
}
</script>

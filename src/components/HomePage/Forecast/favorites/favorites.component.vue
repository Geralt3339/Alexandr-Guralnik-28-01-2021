<template>
  <v-row align="center">
    <v-col>
      <v-row class="pr-2" justify="center" justify-sm="end" align="center">
        <v-icon :color="isFavorite ? 'error' : '#808080'" class="mr-2">{{ isFavorite ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
        <v-btn depressed color="success" @click="favoritesHandler">{{ isFavorite ? 'Remove from favorites' : 'Add to Favorites' }}</v-btn>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { bus } from '../../../../plugins/eventEmitter'

export default {
  props: {
    location: {
      type: Object,
      required: true
    },
    weather: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      isFavorite: false
    }
  },

  watch: {
    location () {
      const favorites = this.$store.getters.getFavoriteLocations
      if (favorites.filter(location => location.key === this.location.key).length !== 0) {
        this.isFavorite = true
      } else {
        this.isFavorite = false
      }
    }
  },

  created () {
    const favorites = this.$store.getters.getFavoriteLocations
    if (favorites.filter(location => location.key === this.location.key).length !== 0) {
      this.isFavorite = true
    }
  },

  updated () {
    const favorites = this.$store.getters.getFavoriteLocations
    if (favorites.filter(location => location.key === this.location.key).length !== 0) {
      this.isFavorite = true
    } else {
      this.isFavorite = false
    }
  },

  methods: {
    favoritesHandler () {
      if (!this.isFavorite) {
        this.$store.dispatch('addFavoriteLocation', {
          ...this.location,
          ...this.weather
        })
        this.isFavorite = true
        bus.$emit('noti', {
          type: 'success',
          text: `${this.location.name} is now favorite`
        })
      } else {
        this.$store.dispatch('removeFavoriteLocation', this.location.key)
        this.isFavorite = false
        bus.$emit('noti', {
          type: 'success',
          text: `${this.location.name} is no more favorite`
        })
      }
    }
  }
}
</script>

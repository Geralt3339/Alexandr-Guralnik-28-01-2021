<template>
  <v-card>
    <v-toolbar dense>
      <v-toolbar-title>Favorite locations</v-toolbar-title>
    </v-toolbar>
    <v-container>
      <v-row v-if="favorites.length > 0" justify="start" class="mt-1">
        <location v-for="(location, index) in favorites" :key="index" :locationData="location" />
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import Location from './location/location.component'

export default {
  components: {
    Location
  },

  data () {
    return {
      favorites: []
    }
  },

  created () {
    this.favorites = this.$store.getters.getFavoriteLocations
    console.log(this.favorites)
  }
}
</script>

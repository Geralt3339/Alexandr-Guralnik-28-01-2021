<template>
  <v-container>
    <favorite-locations />
  </v-container>
</template>

<script>
import FavoriteLocations from '../components/FavoritesPage/locations.component'

export default {
  name: 'Favorites',
  components: {
    FavoriteLocations
  }
}
</script>

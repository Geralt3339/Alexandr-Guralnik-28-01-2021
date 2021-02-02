<template>
  <default-layout>
    <v-container>
      <favorite-locations />
    </v-container>
  </default-layout>
</template>

<script>
import DefaultLayout from '../layouts/default'
import FavoriteLocations from '../components/FavoritesPage/locations.component'

export default {
  name: 'Favorites',
  components: {
    DefaultLayout,
    FavoriteLocations
  }
}
</script>

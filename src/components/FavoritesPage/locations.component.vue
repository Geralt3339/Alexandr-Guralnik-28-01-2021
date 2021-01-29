<template>
  <v-card>
    <v-toolbar dense>
      <v-toolbar-title>Favorite locations</v-toolbar-title>
    </v-toolbar>
    <v-container>
      <v-row justify="start" class="mt-1">
        <location v-for="index in 5" :key="index" />
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import Location from './location/location.component'

export default {
  components: {
    Location
  }
}
</script>

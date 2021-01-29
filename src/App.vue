<template>
  <div id="app">
    <v-app>
      <default-layout />
    </v-app>
  </div>
</template>

<script>
import defaultLayout from './layouts/default'

export default {
  name: 'App',
  components: {
    defaultLayout
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

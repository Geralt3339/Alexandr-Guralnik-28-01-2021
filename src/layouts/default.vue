<template>
  <div>
    <appbar />
    <v-container>
      <v-row>
        <v-col cols="10" offset="1">
          <router-view />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import appbar from '../components/global/appbar.component.vue'

export default {
  components: {
    appbar
  }
}
</script>

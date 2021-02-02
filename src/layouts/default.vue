<template>
  <div>
    <appbar />
    <v-container>
      <v-row>
        <v-col cols="10" offset="1">
          <slot />
        </v-col>
      </v-row>
    </v-container>
    <notification />
  </div>
</template>

<script>
import appbar from '../components/global/appbar.component.vue'
import notification from '../components/global/notification.component.vue'

export default {
  components: {
    appbar, notification
  }
}
</script>

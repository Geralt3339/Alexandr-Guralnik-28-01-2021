<template>
  <v-snackbar v-model="isShown" :color="type" :top="true" :right="true" :timeout="3000">
    {{ text }}
    <template v-slot:action="{ attrs }">
      <v-btn icon v-bind="attrs" @click="isShown = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { bus } from '../../plugins/eventEmitter'

export default {
  data () {
    return {
      isShown: false,
      type: null,
      text: ''
    }
  },

  created () {
    bus.$on('noti', (data) => {
      this.isShown = true
      this.type = data.type ? data.type : 'success'
      this.text = data.text
    })
  },

  beforeDestroy () {
    bus.$off('noti')
  }
}
</script>

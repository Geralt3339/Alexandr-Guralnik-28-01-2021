<template>
  <v-menu>
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" icon>
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item-group>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-brightness-6</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Dark theme</v-list-item-title>
          <v-list-item-action class="mr-3">
            <v-switch v-model="theme" hide-details class="ml-12" />
          </v-list-item-action>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-ruler-square</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Imperial Units</v-list-item-title>
          <v-list-item-action class="mr-3">
            <v-switch v-model="imperialUnits" hide-details class="ml-12" />
          </v-list-item-action>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script>
import { bus } from '../../../plugins/eventEmitter'

export default {
  data () {
    return {
      theme: false,
      imperialUnits: false
    }
  },

  watch: {
    theme (val) {
      this.$vuetify.theme.dark = val
      this.$store.dispatch('currentTheme', val)
    },
    imperialUnits (val) {
      this.$store.dispatch('unitSystem', !val)
      bus.$emit('unit-system')
    }
  },

  created () {
    this.theme = this.$store.getters.getCurrentTheme
    this.imperialUnits = !this.$store.getters.getUnitSystem
    this.$vuetify.theme.dark = this.theme
  }
}
</script>

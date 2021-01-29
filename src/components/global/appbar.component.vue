<template>
  <v-app-bar>
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <v-spacer />
    <template v-for="(item, index) in links">
      <v-btn text active-class="router-link-active" :key="index" :to="item.path">{{ item.name }}</v-btn>
    </template>
    <v-switch v-model="theme" label="Dark theme" hide-details class="ml-12"></v-switch>
  </v-app-bar>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Weather task'
    }
  },

  data () {
    return {
      theme: false,
      links: []
    }
  },

  watch: {
    theme (val) {
      this.$vuetify.theme.dark = val
      this.$store.dispatch('setCurrentTheme', val)
    }
  },

  created () {
    this.links = this.$store.getters.getAppbarLinks
    this.theme = this.$store.getters.getCurrentTheme
    this.$vuetify.theme.dark = this.theme
  }
}
</script>

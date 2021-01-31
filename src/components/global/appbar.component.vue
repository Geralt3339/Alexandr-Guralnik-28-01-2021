<template>
  <v-app-bar>
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <v-spacer />
    <template v-for="(item, index) in links">
      <v-btn text active-class="router-link-active" :key="index" :to="item.path">{{ item.name }}</v-btn>
    </template>
    <appbar-menu />
  </v-app-bar>
</template>

<script>
import AppbarMenu from './appbarMenu/menu.component'

export default {
  props: {
    title: {
      type: String,
      default: 'Weather task'
    }
  },

  components: {
    AppbarMenu
  },

  data () {
    return {
      links: []
    }
  },

  created () {
    this.links = this.$store.getters.getAppbarLinks
  }
}
</script>

<template>
  <v-autocomplete
    v-model="model"
    :items="items"
    item-text="LocalizedName"
    item-value="Key"
    :search-input.sync="search"
    :loading="isLoading"
    placeholder="Tel Aviv..."
    :no-data-text="search == '' ? 'Start typing...' : 'No results'"
    outlined
  />
</template>

<script>
import { autocompleteSearch } from '../../../rest/location'
import { bus } from '../../../plugins/eventEmitter'

export default {
  data () {
    return {
      model: null,
      search: null,
      isLoading: false,
      items: []
    }
  },

  watch: {
    search (val) {
      if (val && val.length < 2) return
      if (this.isLoading) return
      this.isLoading = true
      autocompleteSearch(val).then(res => {
        return res.json()
      }).then(json => {
        this.items = json
      }).catch(() => {
        this.$store.dispatch('isLoadedToggle', false)
        bus.$emit('noti', {
          type: 'error',
          text: 'Sorry, the service is currently unavailable'
        })
      })
        .finally(() => {
          this.isLoading = false
        })
    },

    model (val) {
      bus.$emit('get-weather', val)
    }
  }
}
</script>

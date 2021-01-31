<template>
  <v-autocomplete v-model="model" :items="items" item-text="LocalizedName" item-value="Key" :search-input.sync="search" :loading="isLoading" placeholder="Tel Aviv..." outlined />
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
        console.log(res)
        return res.json()
      }).then(json => {
        console.log(json)
        this.items = json
      }).finally(() => {
        this.isLoading = false
      })
    },

    model (val) {
      bus.$emit('get-weather', val)
    }
  }
}
</script>

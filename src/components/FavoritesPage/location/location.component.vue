<template>
  <v-col cols="6" sm="4" md="2">
    <v-card width="100%">
      <v-container class="text-center">
        <p><strong>{{ location.Name }}</strong></p>
        <p>Sunday</p>
        <p>38 C</p>
      </v-container>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: {
    locationData: {
      type: Object,
      required: true
    }
  }
}
</script>

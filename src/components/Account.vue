<template lang="pug">
  div
    TopBar(v-bind:buttons="buttons", v-bind:title="'Account'")
    div#content
        h2 Account!
</template>
<script>
import TopBar from './TopBar.vue'
export default {
  components: {
      TopBar
  },
  name: 'Account',
  data () {
    return {
      buttons: [ ]
    }
  }
}
</script>
<style lang="sass" scoped>
</style>
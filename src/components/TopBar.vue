<template lang="pug">
  nav#topbar.row
    div.col-xs.nogrow.burger
      //menu-icon
      chevron-right-icon(@click="showMenu")
    div.col-xs.content-left
      h3 {{ title }}
    div.col-xs.content-right
      button.button(v-for="btn in buttons", @click="btn.method" :disabled="btn.disabled") {{btn.name}}
</template>
<script>
import { MenuIcon, ChevronRightIcon } from 'vue-feather-icons'

export default {
  name: 'TopBar',
  components: {
    MenuIcon,
    ChevronRightIcon
  },
  props: [ 'buttons', 'title' ],
  methods: {
    showMenu() {
      this.$parent.$parent.showMenu = true
    }
  }
}
</script>
<style lang="sass" scoped>
nav#topbar
  height: 70px
  width: 100%
  align-items: center
  padding: 0 20px
  color: #888888
  background: #fff

div.content-left
  margin-left: 10px

div.content-right
  display: flex
  justify-content: flex-end
  margin-right: 10px

.burger
  display: none
  @media (max-width: 768px)
    display: block
</style>
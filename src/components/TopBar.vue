<template lang="pug">
  nav#topbar.row
    div.col-xs.content-left
      h3 {{ title }}
    div.col-xs.content-right
      button.button(v-for="btn in buttons", @click="btn.method" :disabled="btn.disabled") {{btn.name}}
</template>
<script>
module.exports = {
  name: 'TopBar',
  props: [ 'buttons', 'title' ]
}
</script>
<style lang="sass" scoped>
nav#topbar
  height: 70px
  width: 100%
  background: #ffffff
  -webkit-box-shadow: 0px 1px 3px 1px #dddddd
  box-shadow: 0px 1px 3px 1px #dddddd
  align-items: center

div.content-left
  margin-left: 10px

div.content-right
  display: flex
  justify-content: flex-end
  margin-right: 10px
</style>
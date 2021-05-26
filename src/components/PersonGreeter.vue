<template lang="pug">
  h2 Hello, {{ personName }}!
</template>
<script>
module.exports = {
  name: 'PersonGreeter',
  props: ['personName']
}
</script>
<style scoped>
  h2 {
    font-size: 40px;
    color: mediumseagreen;
  }
</style>
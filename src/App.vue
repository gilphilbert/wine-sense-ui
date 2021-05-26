<template lang="pug">
  div#app
    nav#menubar
    h1 Wine Sense 
    PersonGreeter(personName='Phill')
</template>
<script>
import PersonGreeter from './components/PersonGreeter.vue'
export default {
  name: 'App',
  components: {
    PersonGreeter
  }
}
</script>
<style>
html {
  background-color: #EBEEF3;
  height: 100%;
}
body {
  height: 100%;
}
#app {
  font-family: Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
#app #menubar {
  display: flex;
  width: 300px;
  height: 100%;
  background-color: #354052;
}
</style>

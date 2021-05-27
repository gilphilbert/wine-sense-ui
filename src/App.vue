<template lang="pug">
  div#app
    nav#menubar
      div#menu-brand
        h2.centered Wine Sense
      ul
        li
          router-link(to="/") Dashboard
        li
          router-link(to="/sensors") Sensors
        li
          router-link(to="/account") Account
        li
          router-link(to="/logout") Logout
    div#main
      nav#topbar
      div#content
        router-view
</template>
<script>
export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      name: "phill"
    }
  }
}

</script>
<style lang="sass">
html
  background-color: #ebeef3
  font-family: 'Lexend', sans-serif
  font-weight: 400
  font-size: 16px

h1, h2, h3, h4, h5, h6
  font-weight: 500
  &.centered
    text-align: center

#app
  display: flex

#menubar
  z-index: 1
  background-color: #354052
  color: white
  min-width: 250px
  height: 100vh
  ul
    padding: 0
    margin: 0
  li
    display: block
    a
      display: block
      border-left: 5px solid transparent
      font-family: 'Lexend'
      font-weight: 500
      font-size: 1.1em
      color: white
      text-decoration: none
      padding: 17px 0 17px 35px
      &.router-link-exact-active
        border-color: #15a083
    &:hover
      background: #51677d
      border-color: #51677d
  #menu-brand
    padding: 10px 0 20px 0

#main
  flex: 1

nav#topbar
  height: 70px
  width: 100%
  background: #ffffff
  -webkit-box-shadow: 0px 1px 3px 1px #dddddd;
  box-shadow: 0px 1px 3px 1px #dddddd;

#content
  padding: 20px 10px

.row
  margin: 0

.card
  background-color: #fff
  height: 250px
  border-radius: 5px
  -webkit-box-shadow: 0px 1px 3px 1px #dddddd;
  box-shadow: 0px 1px 3px 1px #dddddd;
</style>

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
$success: #15A083
$warning: #ECA72C
$danger: #DE6B48
$dark-blue: #354052
$lightest-grey: #EBEEF3
$shadow-color: #dddddd
$default-shadow: 0px 1px 3px 1px #dddddd
$disabled: #c9ccd1

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
  background-color: $dark-blue
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
        border-color: $success
    &:hover
      background: #51677d
      border-color: #51677d
  #menu-brand
    padding: 10px 0 20px 0

#main
  flex: 1

#content
  padding: 20px 10px

.row
  margin: 0

.card
  background-color: #fff
  height: 250px
  border-radius: 5px
  -webkit-box-shadow: $default-shadow
  box-shadow: $default-shadow

div.message
  font-size: 15px
  margin: 10px
  padding: 6px 15px 15px 15px
  background: #fff
  border-radius: 5px
  border: 1px solid #dadce0
  h1
    font-size: 1.1rem
  &.is-warning
    background-color: $warning
    border-color: $warning
    color: #fff
    a
      color: #fff
  &.is-danger
    background-color: $danger
    border-color: $danger
    color: #fff
    a
      color: #fff

a.button, button.button
  border: none
  background-color: $success
  color: #fff
  padding: 9px 15px
  border-radius: 5px
  cursor: pointer
  font-weight: 600
  transition: background 150ms ease
  &:hover
    background-color: #18b896
  &:disabled
    background-color: $disabled!important
    cursor: unset
</style>

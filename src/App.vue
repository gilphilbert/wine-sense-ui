<template lang="pug">
  div#app
    nav#menubar(v-bind:class="{ active: showMenu }" @click="showMenu = false")
      div#menu-brand
        h2.centered Wine Sense
      ul
        li
          router-link(to="/")
            span.icon
              grid-icon
            span.text Dashboard
        li
          router-link(to="/sensors")
            span.icon
              thermometer-icon
            span.text Sensors
        li
          router-link(to="/account")
            span.icon
              user-icon
            span.text Account
        li
          router-link(to="/logout")
            span.icon
              log-out-icon
            span.text Logout
    div#main
      router-view
</template>
<script>
import { MenuIcon, GridIcon, ThermometerIcon, UserIcon, LogOutIcon } from 'vue-feather-icons'

export default {
  name: 'App',
  components: {
    MenuIcon,
    GridIcon,
    ThermometerIcon,
    UserIcon,
    LogOutIcon
  },
  data () {
    return {
      showMenu: false
    }
  }
}

</script>
<style lang="sass">
$white: #ffffff
$blue: #3E92CC
$green: #6BAB90
$yellow: #F0CF65
$red: #D8315B
$purple: #4B4A67 // 8E3B46 //  443850
$dark-blue: #102542
$lightest-grey: #f2f6f7
$disabled: #c9ccd1

$primary: $blue
$success: $green
$warning: $yellow
$danger: $red

html
  background-color: $lightest-grey
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
  background-color: $purple
  color: $yellow
  min-width: 250px
  height: 100vh
  transition: all 0.2s ease
  ul
    padding: 0
    margin: 0
  li
    display: block
    a
      display: flex
      align-items: center
      //border-left: 5px solid transparent
      border-right: 5px solid transparent
      font-family: 'Lexend'
      font-weight: 500
      font-size: 1.1em
      color: $white
      text-decoration: none
      padding: 17px 0 17px 35px
      transition: border 250ms ease
      &.router-link-exact-active
        border-color: $yellow
        .icon
          transition: color 250ms ease
          color: $yellow
    &:hover
      transition: all 300ms ease
      background: $yellow
      a
        color: $purple
        .icon
          color: $purple
        &.router-link-exact-active
          background-color: $purple
          color: $white
          border-color: $yellow
          .icon
            transition: color 250ms ease
            color: $yellow
    .icon
      margin-right: 10px
      color: $white
  #menu-brand
    padding: 10px 0 20px 0
  @media (max-width: 768px)
    position: absolute
    left: -90px
    min-width: 90px
    max-width: 90px
    overflow: hidden
    &.active
      left: 0
    li a
      padding: 17px 0 17px 30px
      .text
        display: none

#main
  flex: 1

#content
  padding: 20px 10px

.row
  margin: 0
  margin-bottom: 16px
  &:last-child
    margin-bottom: 0

.card
  box-sizing: border-box
  background-color: #fff
  border-radius: 10px
  padding: 10px
  &.has-chart>div
    margin-bottom: 20px

div.message
  font-size: 15px
  margin: 10px
  padding: 6px 15px 15px 15px
  background: #fff
  border-radius: 5px
  margin: 0 auto
  @media (max-width: 768px)
    max-width: 100%!important
  h1
    font-size: 1.1rem
  &.warning
    background-color: $warning
    // border-color: $warning
    color: #fff
    a
      color: #fff
  &.danger
    background-color: $danger
    // border-color: $danger
    color: #fff
    a
      color: #fff
  &.success
    background-color: $success
    // border-color: $success
    color: #fff
    a
      color: #fff
  .message-title
    text-align: center
    font-size: 1.5rem
    font-weight: 500

a.button, button.button
  display: inline-block
  border: none
  background-color: $blue
  color: $white
  padding: 9px 15px
  border-radius: 5px
  cursor: pointer
  font-weight: 600
  transition: background 150ms ease
  &.sm
    padding: 6px 10px
    font-size: 0.8rem
  &:hover
    background-color: #18b896
  &:disabled
    background-color: $disabled!important
    cursor: unset

.nogrow
  flex-grow: 0

$ct-series-colors: (#d70206, #f05b4f, #f4c63d, #d17905, #453d3f, #59922b, #0544d3, #6b0392, #f05b4f, #dda458, #eacf7d, #86797d, #b2c326, #6188e2, #a748ca) !default

.ct-legend 
  position: relative
  z-index: 10

  margin: 0
  padding: 0

  li
    display: inline-block
    position: relative
    padding-left: 23px
    margin-bottom: 3px

  li:before
    width: 12px
    height: 12px
    position: absolute
    left: 0
    content: ''
    border: 3px solid transparent
    border-radius: 2px
  

  li.inactive:before 
    background: transparent
  

  &.ct-legend-inside 
    position: absolute
    top: 0
    right: 0
  

  @for $i from 0 to length($ct-series-colors) 
    .ct-series-#{$i}:before
      background-color: nth($ct-series-colors, $i + 1)
      border-color: nth($ct-series-colors, $i + 1)
        
.ct-major-twelfth>svg
  margin-top: 25px

</style>

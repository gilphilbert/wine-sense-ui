<template lang="pug">
  i.icon__signal-strength(v-bind:class="classObject")
    span.bar-1
    span.bar-2
    span.bar-3
    span.bar-4
</template>
<script>
export default {
  name: 'WiFiIcon',
  props: [ 'strength' ],
  computed: {
    classObject: function () {
      return {
        'signal-0': this.strength === 0,
        'signal-1': this.strength === 1,
        'signal-2': this.strength === 2,
        'signal-3': this.strength === 3,
        'signal-4': this.strength === 4,
      }
    }
  }
}
</script>
<style lang="sass">
$success: #15A083
$warning: #ECA72C
$danger: #DE6B48

.icon__signal-strength
  display: inline-flex
  align-items: flex-end
  justify-content: flex-end
  width: auto
  height: 24px
  padding: 4px
  span.bar-1
    height: 25%
  span.bar-2
    height: 50%	
  span.bar-3
    height: 75%
  span.bar-4
    height: 100%

.icon__signal-strength span
  display: inline-block
  width: 4px
  margin-left: 2px
  background-color: $success
  border-radius: 2px

.signal-0
  span
    background-color: $danger
  .bar-1,
  .bar-2,
  .bar-3,
  .bar-4 
    opacity: 0.2

.signal-1
  span
    background-color: $warning
  .bar-2,
  .bar-3,
  .bar-4
    opacity: 0.2

.signal-2
  span
    background-color: $warning
  .bar-3,
  .bar-4
    opacity: 0.2

.signal-3 
  .bar-4 
    opacity: 0.2
</style>
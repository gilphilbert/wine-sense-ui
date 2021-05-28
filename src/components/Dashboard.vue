<template lang="pug">
  div
    TopBar(v-bind:buttons="buttons", v-bind:title="'Dashboard'")
    div#content
      div.row
          div.col-xs-12.col-lg-8
            div.card
              LineChart(:chartdata="chartData" :options="chartOptions")
          div.col-xs-12.col-lg-4
            div.card This is some content
</template>
<script>
import TopBar from './TopBar.vue'
import LineChart from './LineChart.vue'

export default {
  components: {
    TopBar,
    LineChart
  },
  name: 'Dashboard',
  data () {
    return {
      buttons: [ ],
      chartData: {
        datasets: [{
          label: 'My First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      chartOptions: {}
    }
  }
}
</script>
<style lang="sass" scoped>
</style>
<template lang="pug">
  div
    TopBar(v-bind:buttons="buttons", v-bind:title="'Dashboard'")
    div#content
      div.row
          div.col-xs-12.col-lg-8
            div.card.has-chart
              chartist(ratio="ct-major-second" type="Line" :data="chartData" :options="chartOptions")
          div.col-xs-12.col-lg-4
            div.card This is some content
</template>
<script>
import TopBar from './TopBar.vue'

export default {
  components: {
    TopBar
  },
  name: 'Dashboard',
  data () {
    return {
      buttons: [ ],
      chartData: {
        labels: ["A", "B", "C"],
        series:[[1, 3, 2], [4, 6, 5]]
      },
      chartOptions: {
        lineSmooth: false
      }
    }
  }
}
</script>
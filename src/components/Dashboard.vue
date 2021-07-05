<template lang="pug">
  div
    TopBar(v-bind:buttons="buttons", v-bind:title="'Dashboard'")
    div#content
      div.row
          div.col-xs-12.col-lg-4
            div.card
              h2 Temperature
              p This is some content
          div.col-xs-12.col-lg-8
            div.card.has-chart
              chartist(ratio="ct-major-second" type="Line" :data="temperatureChartData" :options="chartOptions")
      div.row
          div.col-xs-12.col-lg-4
            div.card
              h2 Humidity
              p This is some content
          div.col-xs-12.col-lg-8
            div.card.has-chart
              chartist(ratio="ct-major-second" type="Line" :data="humidityChartData" :options="chartOptions")
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
      temperatureChartData: {
        labels: [],
        series:[]
      },
      humidityChartData: {
        labels: [],
        series:[]
      },
      chartOptions: {
        lineSmooth: false,
        plugins: [ this.$chartist.plugins.legend() ]
      }
    }
  },
  created () {
    fetch('/api/readings')
    .then(body => body.json())
    .then(data => {
      let _hum = {}
      let _temp = {}
      data.forEach(el => {
        var k = el.devid + ' ' + el.sensor
        if (!Object.keys(_temp).includes(k)) {
          _temp[k] = []
        }
        _temp[k].push({
          //device: el.devid,
          //sensor: el.sensor,
          //data: el.reading.temperature,
          date: el.date,
          data: el.reading.temperature * 1.8 + 32
        })

        if (!Object.keys(_hum).includes(k)) {
          _hum[k] = []
        }
        _hum[k].push({
          device: el.devid,
          sensor: el.sensor,
          data: el.reading.humidity,
          date: el.date
        })
      })
      let k = Object.keys(_temp).sort()
      console.log(k)
      let temp_d = []
      let temp = []
      let hum_d = []
      let hum = []
      k.forEach(key => {
        temp.push({ 'name': key, 'data': _temp[key] })
        _temp[key].forEach(el => {
          const d = new Date(el.date)
          const date = d.getHours() + ":" + d.getMinutes()
          if (!temp_d.includes(date)) {
            temp_d.push(date)
          }
        })

        hum.push({ 'name': key, 'data': _hum[key] })
        _hum[key].forEach(el => {
          const d = new Date(el.date)
          const date = d.getHours() + ":" + d.getMinutes()
          if (!hum_d.includes(date)) {
            hum_d.push(date)
          }
        })
      })
      //console.log(temp)
      this.temperatureChartData.series = temp
      this.temperatureChartData.labels = temp_d
      this.humidityChartData.series = hum
      this.humidityChartData.labels = hum_d
    })
  }
}
</script>
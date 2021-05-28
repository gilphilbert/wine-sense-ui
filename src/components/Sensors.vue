<template lang="pug">
  div
    TopBar(v-bind:buttons="buttons", v-bind:title="'Sensors'")
    div#content
      div.message.is-danger(v-if="errorMessage")
        h1 No Bluetooth Support
        p Your current web browser does not support bluetooth. Please use a Chromium-based browser (Google Chrome, Brave, Chromium) or Opera to add sensors
      div.message.is-warning(v-if="experimentalMessage")
        h1 Experimental Support for Chromium on Linux
        p Your browser has experimental support for detecting bluetooth devices. To enable it, open a new tab with this link and change the value "Default" to "Enabled" and click "Reload" when prompted.
        a(href="chrome://flags/#enable-experimental-web-platform-features") chrome://flags/#enable-experimental-web-platform-features
      h2 Sensors!
</template>
<script>
/// <reference types="web-bluetooth" />

const SERVICE_UUID = '45ce3e18-db8e-40e3-883d-914a682ac2bf'
const MAIN_CHARACTERISTIC_UUID = 'cc53dab2-a3cc-43f1-bf68-809960776f94'
const NETWORKS_DESCRIPTOR_UUID = 'c3187642-322f-4c8b-8845-d6720def4a5c'

import TopBar from './TopBar.vue'
export default {
  components: {
    TopBar
  },
  name: 'Sensors',
  data () {
    const btState = ((this.bluetooth) ? true : false)
    return {
      buttons: [ { name: 'Add Sensor', method: this.sensorSearch, disabled: !btState } ],
      navigator: window.navigator,
      experimentalMessage: false,
      errorMessage: false,
      btData: {
        networks: [],
        descriptor: null
      }
    }
  },
  created () {
    if(!this.bluetooth) {
      console.log(this.navigator)
      if (this.navigator.platform.includes('Linux') && this.navigator.userAgentData) {
        console.log('here')
        this.navigator.userAgentData.brands.forEach(br => {
          if (br.brand === 'Chromium') {
            this.experimentalMessage = true
          }
        })
      }
      if (this.experimentalMessage == false) {
        this.errorMessage = true
      }
    }
  },
  methods: {
    async sensorSearch () {
      console.log('Add Sensor')
      const device = await this.bluetooth.requestDevice({
        filters: [{
          name: 'Wine Sense'
        }],
        optionalServices: [ SERVICE_UUID ]
      })
      const server = await device.gatt.connect()
      const service = await server.getPrimaryService(SERVICE_UUID)
      const characteristic = await service.getCharacteristic(MAIN_CHARACTERISTIC_UUID)
      await characteristic.startNotifications()
      characteristic.addEventListener('characteristicvaluechanged', evt => {
        console.log(evt.target.value)
      })
      const descriptor = await characteristic.getDescriptor(NETWORKS_DESCRIPTOR_UUID)
      const value = await descriptor.readValue()
      const decoder = new TextDecoder('utf-8')
      const nets = decoder.decode(value).split('|').map(el => {
        return {
          strength: el.substr(0, 1),
          security: el.substr(1, 1),
          ssid: el.substr(2)
        }
      })
      console.log(nets)
      this.descriptor = descriptor
      this.btData.networks = nets
    }
  }
}
</script>
<style lang="sass" scoped>
</style>
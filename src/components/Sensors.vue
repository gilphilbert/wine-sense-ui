<template lang="pug">
  div
    TopBar(v-bind:buttons="buttons", v-bind:title="'Sensors'")
    div#content
      div.message.danger(v-if="errorMessage")
        h1 No Bluetooth Support
        p Your current web browser does not support bluetooth. Please use a Chromium-based browser (Google Chrome, Brave, Chromium) or Opera to add sensors
      div.message.warning(v-if="experimentalMessage")
        h1 Experimental Support for Chromium on Linux
        p Your browser has experimental support for detecting bluetooth devices. To enable it, open a new tab with this link and change the value "Default" to "Enabled" and click "Reload" when prompted.
        a(href="chrome://flags/#enable-experimental-web-platform-features") chrome://flags/#enable-experimental-web-platform-features
      div.message.add(v-if="btData.networks.length > 0")
        h2 Add Sensor
        p ID: {{ btData.identifier }}
        ul.nets(v-if="addSensorData.ssid === ''")
          li(v-for="data in btData.networks")
            div.row.middle-xs
              div.col-xs.nogrow
                WiFiIcon(v-bind:strength="data.strength")
              div.col-xs
                span {{ data.ssid }}
              div.col-xs.nogrow(v-if="data.security === 0")
                alert-circle-icon
              div.col-xs.nogrow
                a.button.sm(v-on:click="setWiFi(data.ssid)") Select
        div.connect(v-if="addSensorData.ssid !== ''")
          form
            fieldset
              label(for="ssid") SSID
              input(name="ssid" v-model:value="addSensorData.ssid" readonly)
            fieldset
              label(for="key") Network Key
              input(name="key" v-model:value="addSensorData.key")
            a.button(v-on:click="connectWiFi") Connect
      div.row(v-if="btData.networks.length === 0")
        div.col-xs-12(v-if="sensors.length==0")
          div.message.warning
            h3.message-title No Sensors
            p You don't have any sensors, add one!
</template>
<script>
/// <reference types="web-bluetooth" />

const SERVICE_UUID = '45ce3e18-db8e-40e3-883d-914a682ac2bf'
const MAIN_CHARACTERISTIC_UUID = 'cc53dab2-a3cc-43f1-bf68-809960776f94'
const NETWORKS_DESCRIPTOR_UUID = 'c3187642-322f-4c8b-8845-d6720def4a5c'
const DEVICE_IDENTIFIER_UUID = '8bc76349-0cb6-4e1a-bba5-90fa7e65c6ad'

import TopBar from './TopBar.vue'
import WiFiIcon from './wifi.vue'
import { UnlockIcon, AlertCircleIcon } from 'vue-feather-icons'

export default {
  components: {
    TopBar,
    WiFiIcon,
    UnlockIcon,
    AlertCircleIcon
  },
  name: 'Sensors',
  data () {
    const btState = ((this.bluetooth) ? true : false)
    return {
      buttons: [ { name: 'Add Sensor', method: this.sensorSearch, disabled: !btState } ],
      navigator: window.navigator,
      experimentalMessage: false,
      errorMessage: false,
      sensors: [ ],
      btData: {
        networks: [
           //{ ssid: 'Glibertvue', strength: 3, security: 2 }, { ssid: 'SnowBaby', strength: 2, security: 2 }, { ssid: 'Xfinity', strength: 1, security: 0 }
        ],
        characteristic: null,
        identifier: ''
      },
      addSensorData: {
        ssid: '',
        key: ''
      },
      device_id_char: null
    }
  },
  created () {
    if(!this.bluetooth) {
      if (this.navigator.platform.includes('Linux') && this.navigator.userAgentData) {
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
      console.log(service)
      let characteristic = await service.getCharacteristic(MAIN_CHARACTERISTIC_UUID)
      await characteristic.startNotifications()
      characteristic.addEventListener('characteristicvaluechanged', evt => {
        const decoder = new TextDecoder('utf-8')
        const value = decoder.decode(evt.target.value)
        const data = JSON.parse(value)
        if (data.hasOwnProperty('state')) {
          if (data.state === 'failed') {
            console.log('Password incorrect / unable to connect')
          } else {
            console.log('Success!')
            this.addDevice()
          }
        } else {
          console.log('Unknown error')
        }
      })
      const descriptor = await characteristic.getDescriptor(NETWORKS_DESCRIPTOR_UUID)
      let value = await descriptor.readValue()
      const decoder = new TextDecoder('utf-8')
      const nets = decoder.decode(value).split('|').map(el => {
        return {
          strength: el.substr(0, 1),
          security: el.substr(1, 1),
          ssid: el.substr(2)
        }
      })
      this.btData.characteristic = characteristic
      this.btData.networks = nets

      this.device_id_char = await service.getCharacteristic(DEVICE_IDENTIFIER_UUID)
      value = await characteristic.readValue()
      this.btData.identifier = decoder.decode(value)
    },
    setWiFi (e) {
      this.addSensorData.ssid = e
    },
    connectWiFi () {
      let msgBody = JSON.stringify({ ssid: this.addSensorData.ssid, key: this.addSensorData.key })
      console.log(msgBody)
      this.btData.characteristic.writeValue(new TextEncoder().encode(msgBody+"\n"))
    },
    addDevice () {
      // adding device
      console.log('Adding device to server')
    }
  }
}
</script>
<style lang="sass" scoped>
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

ul.nets
  padding: 0
  li
    display: block
    padding: 6px 0

form
  padding: 0
  fieldset
    border: none
    padding: 8px 4px
    label
      display: block
      font-weight: 500
      margin: 0 0 5px 0
    input
      width: 100%
      padding: 8px 10px
      margin: 0 0 10px 0
      border: none
      outline: none
      border-bottom: 2px solid $purple
      box-sizing: border-box
      &:read-only
        background: #f3f3f3
      &:focus, &:active
        border-color: $green

div.message.add
  max-width: 400px

span.lock
  display: inline-block
  background: #dddddd
  border-radius: 2px
  width: 16px
  height: 12px
  top: 4px
  position: relative

span.lock:before
  content: ""
  display: block
  position: absolute
  border: 3px solid #dddddd
  top: -7px
  left: 3px
  width: 5px
  height: 10px
  border-radius: 50px 50px 0 0
</style>
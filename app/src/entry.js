import Vue from 'vue'

import App from './App.vue'

import ElementUI from 'element-ui'
import { Button, Select } from 'element-ui'

Vue.use(ElementUI)

new Vue({
  el: '#app',
  render: h => h(App)
})

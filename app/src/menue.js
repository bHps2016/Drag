import Vue from 'vue'

import Menue from './Menue.vue'

import ElementUI from 'element-ui'
import { Button, Select } from 'element-ui'

Vue.use(ElementUI)

var index=new Vue({
  el: '#app',
  render: h => h(Menue)
})
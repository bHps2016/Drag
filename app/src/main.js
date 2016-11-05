import Vue from 'vue'
import VueResource from 'vue-resource';

import Mian from './Main.vue'

import ElementUI from 'element-ui'
import { Button, Select } from 'element-ui'

Vue.use(VueResource);
Vue.use(ElementUI)

var home=new Vue({
  el: '#app',
  render: h => h(Mian)
})

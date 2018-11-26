import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuelidate from 'vuelidate'

import App from './App.vue'

import store from './store'

Vue.use(VueAxios, axios)
Vue.use(Vuelidate)

export const eventEmitter = new Vue()

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})

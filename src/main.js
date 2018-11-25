import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuelidate from 'vuelidate'

import App from './App.vue'

Vue.use(VueAxios, axios)
Vue.use(Vuelidate)

new Vue({
  el: '#app',
  render: h => h(App)
})
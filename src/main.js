import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuelidate from 'vuelidate'
import SuiVue from 'semantic-ui-vue'

import App from './App.vue'

import store from './store'

Vue.use(VueAxios, axios);
Vue.use(Vuelidate);
Vue.use(SuiVue);

export const eventEmitter = new Vue()

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex);
Vue.use(VueAxios, axios);

export default new Vuex.Store({
  state: {
    items: []
  },
  actions: {
    loadItems ({ commit }) {
      axios
        .get('http://exam.lenkomtech.ru/api/task')
        .then(response => response.data.items)
        .then(items => {
          commit('LOAD_ITEMS', items)
        })
    },
    addItem({commit}, item) {
      axios
        .post('http://exam.lenkomtech.ru/api/task',{
            name: item.name,
            time: item.time
          },
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-',
            }
          }
        )
        .then(() => {commit('ADD_ITEM', item)})
        //добавляется без ид, прислать новый ид в ответе сервера? или генерировать ид на фронте?
        .catch(() => (console.log('Error')))
    },
    deleteItem({commit}, id) {
      axios
        .delete('http://exam.lenkomtech.ru/api/task/'+id)
        .then(() => {commit('DELETE_ITEM', id)})
        .catch(() => {console.log('Error')})
    }
  },
  mutations: {
    LOAD_ITEMS (state, items) {
      state.items = items
    },
    ADD_ITEM (state, item) {
      state.items.push(item)
    },
    DELETE_ITEM (state, id) {
      let indexToRemove = state.items.findIndex(obj => obj.id == id);
      state.items.splice(indexToRemove , 1);
    }
  }
})

<template>
  <div>
    <ul v-if="items && items.length" class="taskList">
      <li v-for="item in sortedArray" :key="item.id">
        <input type="checkbox" v-bind:value="item" v-model="selectedItems">
        <span>{{item.name}}</span> -
        <span>{{item.time}}</span>
        <button @click="deleteTask(item.id)">X</button>
      </li>
    </ul>
    <span v-if="error && error.length">{{error}}</span>
    <ul>
      <li v-for="item in selectedItems">{{item.id}} - {{item.name}} - {{item.time}}</li>
    </ul>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    data(){
      return{
          items:[],
          error: '',
          selectedItems:[]
      }
    },
    mounted() {
      axios
        .get('http://exam.lenkomtech.ru/api/task')
        .then(response => (this.items = response.data.items))
        .catch(() => (this.error = 'Error'))
    },
    methods: {
      deleteTask(id){
        axios
         .delete('http://exam.lenkomtech.ru/api/task/'+id)
         .then(() => {console.log('Ok')})
         .catch(() => {console.log('Error')})
      }
    },
    computed: {
      sortedArray: function() {
        function compare(a, b) {
          if (a.time < b.time)
            return -1;
          if (a.time > b.time)
            return 1;
          return 0;
        }
        return this.items.sort(compare);
      }
    }
  }
</script>

<style>
  .taskList{
    margin-left: 0;
    padding-left: 0;
  }
  .taskList li{
    list-style-type: none;
  }
</style>

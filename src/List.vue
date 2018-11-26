<template>
  <div>
    <ul v-if="$store.state.items && $store.state.items.length" class="taskList">
      <li v-for="item in sortedArray" :key="item.id">
        <input type="checkbox" v-bind:value="item" v-model="selectedItems">
        <span>{{item.name}}</span> -
        <span>{{item.time}}</span>
        <button @click="deleteTask(item.id)">X</button>
      </li>
    </ul>
    <ul>
      <li v-for="item in selectedItems">{{item.id}} - {{item.name}} - {{item.time}}</li>
    </ul>
  </div>
</template>

<script>
  import axios from 'axios';
  import { mapState } from 'vuex';

  export default {
    data(){
      return{
          selectedItems:[]
      }
    },
    mounted () {
      this.$store.dispatch('loadItems')
    },
    methods: {
      deleteTask(id){
        this.$store.dispatch('deleteItem',id);
      }
    },
    computed: mapState([
      'items'
    ]),
    computed: {
      sortedArray: function() {
        function compare(a, b) {
          if (a.time < b.time)
            return -1;
          if (a.time > b.time)
            return 1;
          return 0;
        }
        return this.$store.state.items.sort(compare);
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
  .selected{
    border: 1px solid red;
  }
</style>

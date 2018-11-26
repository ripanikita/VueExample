<template>
  <div>
    <ul v-if="$store.state.items && $store.state.items.length" class="taskList">
      <li v-for="item in sortedArray" :key="item.id">
        <input type="checkbox" v-bind:value="item" v-model="selectedItems"  @click="handle" class="gdsa" ref="checkb">
        <span>{{item.name}}</span> -
        <span>{{item.time}}</span>
        <button @click="deleteTask(item.id)">X</button>
      </li>
    </ul>
    <ul>
      <li v-for="item in selectedItems">{{item}}</li>
    </ul>
    <span>{{x}}</span>
  </div>
</template>

<script>
  import {eventEmitter} from './main'
  import axios from 'axios';
  import { mapState } from 'vuex';

  export default {
    data(){
      return{
          selectedItems:[],
          x : 0
      }
    },
    mounted () {
      this.$store.dispatch('loadItems')
    },
    created() {
      eventEmitter.$on('taskSelected', (time) => {
        let newArr = [];
        this.$store.state.items.map(function(item) {
          if(item.time == time){
            newArr.push(item.name)
          }
        });
        this.selectedItems = newArr;
      })
    },
    methods: {
      deleteTask(id){
        this.$store.dispatch('deleteItem',id);
      },
      handle(){
        alert(this.$refs.checkb.innerHTML)
      },
      selectTime(){
        //eventEmitter.$emit('timeSelected', x)
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

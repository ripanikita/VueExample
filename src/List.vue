<template>
  <div>
    <ul v-if="$store.state.items && $store.state.items.length" class="taskList">
      <li v-for="item in sortedArray" :key="item.id" class="item">
        <div class="check">
          <sui-checkbox v-bind:value="item" v-model="selectedItems"  v-on:change="selectTime"/>
        </div>
        <div class="content">
          <span>{{item.time}} - {{item.name}}</span>
        </div>
        <div class="delBtn">
          <sui-button negative icon="close icon" @click="deleteTask(item.id)" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import {eventEmitter} from './main'
  import axios from 'axios'
  import { mapState } from 'vuex'

  export default {
    data(){
      return{
          selectedItems: []
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
            newArr.push(item)
          }
        });
        this.selectedItems = newArr;
      })
    },
    methods: {
      deleteTask(id){
        this.$store.dispatch('deleteItem',id)
      },
      selectTime(){
        eventEmitter.$emit('timeSelected', this.selectedItems)
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
        return this.$store.state.items.sort(compare)
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
  .item{
    height: 45px;
    margin: 5px 0;
    border-bottom: 1px solid lightgrey;
    display: flex;
  }
  .item div{
    box-sizing: border-box;
    margin: 0 5px;
    align-self:center;
  }
  .delBtn{
    width: 40px;
  }
  .check{
    width: 25px;
  }
  .content{
    width: calc(100% - 100px);
  }
  .content span{
    font-size: 18px;
    position: relative;
    top: -2px;
  }
</style>

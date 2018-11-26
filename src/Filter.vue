<template>
  <div>
    <h2>Редактирование времени</h2>
    <ul class="editTime">
      <li v-for="time in timeArr">
        <input type="radio" :value="time" :name="time" v-model="selectedTime" v-on:click="selectTask(time)">
        <label>{{time}}</label>
      </li>
    </ul>
    <span><b>{{selectedTime}}</b></span>
  </div>
</template>

<script>
  import {eventEmitter} from './main'
export default {
  data(){
    return{
      timeArr:[],
      selectedTime: ''
    }
  },
  mounted() {
      //параметры в пропсы?
      //ошибка генерации времени
      let i;
      for(i=1000; i<=1330; i+=15){
        let x = String(i);
        if(x.length<4){x = '0'+x}
        if(Number(x[0])<3 && Number(x[2])<6){
          let y = x[0]+x[1]+':'+x[2]+x[3];
          this.timeArr.push(y);
        }
      }
  },
  methods: {
    selectTask(time){
      eventEmitter.$emit('taskSelected', time)
    }
  },
  created() {
    eventEmitter.$on('timeSelected', () => {

    })
  },
}
</script>

<style>
.editTime{
  -webkit-column-count: 3;
  -moz-column-count: 3;
  column-count: 3;
  margin-left: 0;
  padding-left: 0;
}
.editTime li{
  list-style-type: none;
}
</style>

<template>
  <div>
    <h3>Редактирование времени</h3>
    <ul class="editTime">
      <li v-for="time in timeArr">
        <sui-checkbox  radio :value="time" :name="time" v-model="selectedTime" v-on:change="selectTask(time)" />
        <span class="time">{{time}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import {eventEmitter} from './main'
export default {
  data(){
    return{
      timeArr: [],
      selectedItems: [],
      selectedTime: '',
      startTime: '10:00',
      endTime: '14:00',
      intervalTime: 15
    }
  },
  mounted() {
    let startArr = this.startTime.split(':');
    let endArr = this.endTime.split(':');

    let dateStart = new Date();
    let dateEnd = new Date();

    dateStart.setHours(startArr[0], startArr[1], 0, 0);
    dateEnd.setHours(endArr[0], endArr[1], 0, 0);
    let x = false;
    while(x == false){
      if(dateStart.getMinutes() == 0){
        this.timeArr.push(dateStart.getHours() + ':00')
      } else{
          this.timeArr.push(dateStart.getHours() + ':' + dateStart.getMinutes())
      }
      dateStart.setMinutes(dateStart.getMinutes() + this.intervalTime);
      if(dateStart.getHours()==dateEnd.getHours() && dateStart.getMinutes()==dateEnd.getMinutes()){
        x = true
      }
    }
  },
  methods: {
    selectTask(time){
      this.selectedItems.map((item) => {
        item.time = time;
        this.$store.dispatch('patchItem',item)
      });
      eventEmitter.$emit('taskSelected', time)
    }
  },
  created() {
    eventEmitter.$on('timeSelected', (arr) => {
      this.selectedItems = arr;
      this.selectedTime = '';
      if(arr.length == 1){
        this.selectedTime = arr[0].time
      }
    })
  }
}
</script>

<style>
.editTime{
  -webkit-column-count: 4;
  -moz-column-count: 4;
  column-count: 4;
  margin-left: 0;
  padding-left: 0;
}
.editTime li{
  list-style-type: none;
}
.time{
  font-size: 18px;
}
</style>

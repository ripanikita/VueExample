<template>
  <div>
    <h2>Добавить новое событие</h2>
    <form action="" @submit.prevent="onSubmit">
      <label for="name">Событие</label>
      <input type="text" v-model="name" id="name" @input="$v.name.$touch()" :class="{'invalid' : $v.name.$error}">
      <br />
      <label for="time">Время</label>
      <input type="text" v-model="time" id="time" @input="$v.time.$touch()" :class="{'invalid' : $v.time.$error}">
      <br />
      <button v-on:click="sendData" type="submit" :disabled="$v.$invalid">Добавить</button>
    </form>
    <span v-if="done && done.length">{{done}}</span>
    <span v-if="error && error.length">{{error}}</span>
  </div>
</template>

<script>
  import axios from 'axios';
  import { required } from 'vuelidate/lib/validators';

  export default {
    data(){
        return{
          name:'',
          time:'',
          done:'',
          error: ''
        }
    },
    validations:{
        name:{
          required
        },
        time:{
          required,
          isValidTime: function(time){
            let timeArr = time.split(':');
            if(timeArr[0]>=0 && timeArr[0]<=23 && timeArr[1]>=0 && timeArr[1]<=59){
              return true
            } else {return false}
          }
        }
    },
    methods: {
      sendData(){
        let timeArr = this.time.split(':');
        if(timeArr[0].length<2){
          this.time = '0'+this.time;
        }
          axios
            .post('http://exam.lenkomtech.ru/api/task',{
                name: this.name,
                time: this.time
            },
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-',
              }
            }
            )
            .then(() => {this.done = 'Готово'})
            .catch(() => (this.error = 'Error'))
      },
      onSubmit(){
        console.log('ok')
      }
    }
  }
</script>

<style>
.invalid{background-color:#FFC9C9;}
.show-feedback{display:block}
</style>


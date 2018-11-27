<template>
  <div class="add">
    <sui-button @click.native="toggle" positive icon="pencil alternate">Добавить событие</sui-button>
    <sui-modal v-model="open" class="myModal">
      <sui-modal-header>Добавить событие</sui-modal-header>
      <sui-modal-content>
        <sui-modal-description>
          <p>
            <sui-input placeholder="Событие" v-model="name" id="name" @input="$v.name.$touch()" :class="{'invalid' : $v.name.$error}" />
          </p>
          <p>
            <sui-input placeholder="Время" v-model="time" id="time" @input="$v.time.$touch()" :class="{'invalid' : $v.time.$error}"/>
          </p>
        </sui-modal-description>
      </sui-modal-content>
      <sui-modal-actions>
        <sui-button positive @click.native="sendData" type="submit" :disabled="$v.$invalid">
          Добавить
        </sui-button>
      </sui-modal-actions>
    </sui-modal>
  </div>
</template>

<script>
import axios from 'axios';
import { required } from 'vuelidate/lib/validators';

export default {
  data(){
    return{
      open: false,
      name:'',
      time:''
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
        this.time = '0'+this.time
      }
      this.$store.dispatch('addItem', {
        name: this.name,time: this.time
      });
      this.open = !this.open;
      this.time = '';
      this.name = '';
    },
    toggle() {
      this.open = !this.open;
    }
  }
}
</script>

<style>
.add{
  margin-bottom: 20px;
}
.ui.modal{
  width:500px;
}
.ui.input{
  width:450px;
}
</style>


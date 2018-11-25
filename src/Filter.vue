<template>
  <div>
    <h2>Редактировнаие времени</h2>
    <ul>
      <li v-for="time in timeArr">{{ time }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data(){
    return{
      timeArr:[]
    }
  },
  mounted() {
      let i;
      for(i=1000; i<=1330; i+=15){
        let x = String(i);
        if(x.length<4){x = '0'+x}
        if(Number(x[0])<3 && Number(x[2])<6){
          let y = x[0]+x[1]+':'+x[2]+x[3];
          this.timeArr.push(y);
        }
      }
  }
}
</script>

<style>

</style>

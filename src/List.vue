<template>
  <div>
    <ul v-if="items && items.length">
      <li v-for="(item, index) in sortedArray" :key="item.id">
        <span>{{item.name}}</span> -
        <span>{{item.time}}</span>
      </li>
    </ul>
    <span v-if="error && error.length">{{error}}</span>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    data(){
      return{
          items:[],
          error: ''
      }
    },
    mounted() {
      axios
        .get('http://exam.lenkomtech.ru/api/task')
        .then(response => (this.items = response.data.items))
        .catch(() => (this.error = 'Error'))
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

</style>

<template>
  <div class="main">
    <add />
    <hr />
    <filter1 />
    <hr />
    <list />
  </div>
</template>

<script>
  import add from './Add.vue'
  import list from './List.vue'
  import filter1 from './Filter.vue'

  export default {
    components: {
      add,
      list,
      filter1
    }
  }
</script>

<style>
.main{
  margin: 0 auto;
  width: 800px;
}
</style>

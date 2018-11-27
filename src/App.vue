<template>
  <div class="main">
    <add />
    <filterBar />
    <hr />
    <list />
  </div>
</template>

<script>
  import list from './List.vue'
  import filterBar from './FilterBar.vue'
  import add from './Add.vue'

  export default {
    components: {
      add,
      list,
      filterBar
    }
  }
</script>

<style>
  .main{
    margin: 20px auto;
    width: 800px;
  }
</style>

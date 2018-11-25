<template>
  <div>
    <add />
    <hr />
    <list />
    <hr />
    <filter />
  </div>
</template>

<script>
  import add from './Add.vue'
  import list from './List.vue'
  import filter from './Filter.vue'
  export default {
    components: {
      add,
      list,
      filter
    }
  }
</script>

<style>

</style>

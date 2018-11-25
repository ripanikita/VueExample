<template>
  <div>
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

</style>

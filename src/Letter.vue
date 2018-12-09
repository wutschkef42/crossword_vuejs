
<template>

    <p class="found" v-if="found">{{ char }}</p>
    <p class="blank" v-else>{{ char }}</p>

</template>


<script>

export default {
  name: 'letter',
  data () {
    
    const x = 0;
    return {
        x: this.x,
        
    }
  },
  methods: {

  },
  props: ['char', 'found'],
}

</script>


<style>

    .found {
        color: green;
        font-weight: bold;
    }
    .blank {
        color: white;
    }

</style>

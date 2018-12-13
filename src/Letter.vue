
<template>
    <p class="letter found" v-if="found">{{ char }}</p>
    <p class="letter blank" v-else>{{ char }}</p>
</template>

<script>
export default {
  name: 'letter',
  props: ['char', 'found'],
}
</script>

<style>
    .letter {
        cursor: pointer;
        padding:5px 8px 8px 7px;
    }
    .letter:hover {
        background-color: gray;
    }
    .found {
        color: green;
        font-weight: bold;     
    }
    .blank {
        color: white;
    }
</style>


<template>
    <div id="word-list">
        <ul>
            <li v-for="word in word_list">
                <p v-if="word.found_state" class="cross-out">{{ word.str }}</p>
                <p v-else>{{ word.str }}</p>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  name: 'wordList',
  props: ['word_list'],
}
</script>

<style>
    #word-list ul li {
        display: block;
        height: 45px;
        text-align: left;   
    }
    .cross-out {
        text-decoration: line-through;
    }
</style>

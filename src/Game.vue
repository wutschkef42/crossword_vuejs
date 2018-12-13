
<template>
  <div id="app">
    <div id = "game-board">
      <h1>Crossword Puzzle</h1>  
      <ul v-for="(row, row_index) in rows">
        <li v-on:click="handleClick(row_index, col_index)" 
          v-for="(letter, col_index) in row">
          <letter v-bind:char=letter.letter v-bind:found=letter.is_found></letter>
        </li>
      </ul>      
    </div>
    <div id="words">
      <h1 id="list-header">Word List</h1>
      <word-list  v-bind:word_list="valid_words"/>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Letter from './Letter.vue';
import WordList from './WordList.vue';
import { walkWord } from './walkBoard.js';
import {isValidWord, deleteWordFromList } from './manageWordList.js';
import { SELECT, HIGHLIGHT, CHECK, SET } from './constants.js';

export default {
  name: 'game',
  data () {
    return {
      x1: -1,
      x2: -1,
      y1: -1,
      y2: -1,
      click_state: -1,
      selection: "",
    }
  },
  methods: {

    /*
    ** user input requires two clicks; on the first and last character of the word
    ** click_state keeps track of the state of user interaction
    ** everytime the user selects a pair of characters, handleClick checks if the
    ** selected characters are a valid word and highlighs them if they are valid
    */
   
    handleClick: function(row, col) {      
      if (this.click_state == - 1) {
        this.x1 = row;
        this.y1 = col;
        this.click_state = 0;
      }
      else if (this.click_state == 0) {
        this.x2 = row;
        this.y2 = col;
        this.click_state = 1;
        this.selection = walkWord(this.rows, this.x1, this.y1,
          this.x2, this.y2, "", SELECT);
        if (isValidWord(this.selection, this.valid_words)) {
          walkWord(this.rows, this.x1, this.y1, this.x2, this.y2,
            "", HIGHLIGHT);
          deleteWordFromList(this.selection, this.valid_words);
        }
      }
      else if (this.click_state == 1) {
        this.x1 = row;
        this.y1 = col;
        this.x2 = -1;
        this.y2 = -1;
        this.click_state = 0;
      }
    },
  },
  components: {
    Letter,
    WordList,
  },
  props: ['valid_words', 'rows'],
}
</script>

<style>
body {
  background-color: #2c3e50;
  max-width: 1200px;
  margin: 0 auto;
}
#app {
  font-family: 'Courier';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  margin-top: 60px;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
  height: 0px;
}
p {
  margin: 0;
  font-size: 22px;
}
a {
  color: #42b983;
}
#game-board {
  float: left;
  width: 900px;
}
#words {
  float: left;
  padding-top: 100px;
}
#list-header {
  text-decoration: underline;
}
</style>

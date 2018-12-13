
<template>
  <div id="app">
    <div id = "game-board">
      <h1>Crossword Puzzle</h1>  
      <ul v-if="!is_paused" v-for="(row, row_index) in rows">
        <li v-on:click="handleClick(row_index, col_index)" 
          v-for="(letter, col_index) in row">
          <letter v-bind:char=letter.letter v-bind:found=letter.is_found v-bind:is_selected=rows[row_index][col_index].is_selected v-bind:is_clicked="checkClick(row_index, col_index)"></letter>
        </li>
      </ul>      
    </div>
    <div id="words">
      <h1 id="list-header">Word List</h1>
      <word-list  v-bind:word_list="valid_words"/>
    </div>
    <div v-if="is_paused" v-bind:selection=selection id="message">
      <p>You have clicked the word '{{selection}}'</p><br/>
      <button @click="resumeGame">Resume Game</button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Letter from './Letter.vue';
import WordList from './WordList.vue';
import { walkWord } from './walkBoard.js';
import { isValidWord, deleteWordFromList } from './manageWordList.js';
import { SELECT, HIGHLIGHT, CHECK, SET, CLEAR_HIGHLIGHT, SET_HIGHLIGHT } from './constants.js';

let actionHook = (selection) => {
  console.log(selection);
}


let invalidCoords = (x1, y1, x2, y2) => {
  if (x2 > 16 || y2 > 16 || x2 < 0 || y2 < 0)
    return true;
  if (x1 == x2 || y1 == y2) {
    return false ;
  }
  if (Math.abs(x1 - x2) == Math.abs(y1 - y2)) {
    return (false);
  }
  return (true);
}


let clearPrevHighlight = (rows, x1, y1, x2, y2) => {
  if (!invalidCoords(x1, y1, x2, y2))
    walkWord(rows, x1, y1, x2, y2, "", CLEAR_HIGHLIGHT);
}

let setNewHighlight = (rows, x1, y1, x2, y2) => {
  if (!invalidCoords(x1, y1, x2, y2))
    walkWord(rows, x1, y1, x2, y2, "", SET_HIGHLIGHT);
}

let flushHighlight = (rows) => {
  for (let i = 0; i < 17; i++) {
    for (let j = 0; j < 17; j++) {
      rows[i][j].is_selected = 0;
    }
  }
}

export default {
  name: 'game',
  data () {
    return {
      x1: -1,
      x2: -1,
      y1: -1,
      y2: -1,
      x_hover: -1,
      y_hover: -1,
      click_state: -1,
      selection: "",
      is_paused: 0,
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
        this.rows[row][col].is_selected = 1;
        this.click_state = 0;
      }
      else if (this.click_state == 0) {
        this.x2 = row;
        this.y2 = col;
        this.rows[row][col].is_selected = 0;
        this.click_state = 1;
        this.selection = walkWord(this.rows, this.x1, this.y1,
          this.x2, this.y2, "", SELECT);
        if (isValidWord(this.selection, this.valid_words)) {
          walkWord(this.rows, this.x1, this.y1, this.x2, this.y2,
            "", HIGHLIGHT);
          deleteWordFromList(this.selection, this.valid_words);
          this.is_paused = 1;
        }
      }
      else if (this.click_state == 1) {
        //flushHighlight(this.rows);
        walkWord(this.rows, this.x1, this.y1, row, col, "", CLEAR_HIGHLIGHT);
        this.rows[this.x1][this.y1].is_selected = 0;
        this.x1 = row;
        this.y1 = col;
        //this.rows[row][col].is_selected = 1;
        this.x2 = -1;
        this.y2 = -1;
        this.click_state = 0;
        
        
      }
      console.log(this.click_state);
    },
    resumeGame: function() {
      this.is_paused = 0;
    },
    highlightSelection: function(row, col) {
      if (this.click_state == 0 || this.click_state == 1) {
        clearPrevHighlight(this.rows, this.x1, this.y1, this.x_hover, this.y_hover);
        this.x_hover = row;
        this.y_hover = col;
        setNewHighlight(this.rows, this.x1, this.y1, this.x_hover, this.y_hover);
      }
    },
    checkClick(row, col) {
      if (row == this.x1 && col == this.y1)
        return (true);
      return (false);
    }
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
  min-width: 1200px;
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
#message {
  float: left;
  padding-left: 220px;
  padding-top: 30px;
}
</style>

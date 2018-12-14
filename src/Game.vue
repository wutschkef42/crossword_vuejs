
<template>
  <div id="app">
    <div id = "game-board">
      <h1>Crossword Puzzle</h1>  
      <ul v-if="!is_paused" v-for="(row, row_index) in rows">
        <li 
          v-for="(letter, col_index) in row"
          v-on:click="handleClick(row_index, col_index)" 
          v-on:mouseover="highlightSelection(row_index, col_index)"
        >  
          <letter
            v-bind:char=letter.letter v-bind:found=letter.is_found 
            v-bind:is_selected=rows[row_index][col_index].is_selected 
            v-bind:is_clicked="checkClick(row_index, col_index)">
          </letter>
        </li>
      </ul>      
    </div>
    <div id="words">
      <h1 id="list-header">Word List</h1>
      <word-list  v-bind:word_list="valid_words"/>
      <div v-if="game_over">
        <button @click="restartGame()" id="restart"> Restart Game</button>
    </div>
    </div>
    <div v-if="is_paused" v-bind:selection=selection id="message">
      <p>You have clicked the word '{{selection}}'</p><br/>
      <button @click="resumeGame()">Resume Game</button>
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


/*
** before printing to screen, reverse selected word if necessary
*/

let checkSpelling = (word, valid_words) => {
  const rev_word = word.split("").reverse().join("");
  for (let i = 0; i < valid_words.length; i++) {
    if (word == valid_words[i].str) {
      return (word);
      
    } else if (rev_word == valid_words[i].str) {
      return (rev_word)
    }
  }
}

/*
** check if coordinates are valid before calling walkWord()
*/

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


/*
** clear the current mouseover hover event selection
*/

let clearPrevHighlight = (rows, x1, y1, x2, y2) => {
  if (!invalidCoords(x1, y1, x2, y2))
    walkWord(rows, x1, y1, x2, y2, "", CLEAR_HIGHLIGHT);
}

/* 
** set a new mouseover hover event selection
*/

let setNewHighlight = (rows, x1, y1, x2, y2) => {
  if (!invalidCoords(x1, y1, x2, y2))
    walkWord(rows, x1, y1, x2, y2, "", SET_HIGHLIGHT);
}

/*
** check if the player has found all words on the map
*/

let allWordsAreFound = (valid_words) => {
  let ret = true;
  for (let i = 0; i < valid_words.length; i++) {
    if (valid_words[i].found_state == 0)
      ret = false;
  }
  return (ret);
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
      game_over: 0,
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
          this.selection = checkSpelling(this.selection, this.valid_words);
          walkWord(this.rows, this.x1, this.y1, this.x2, this.y2,
            "", HIGHLIGHT);
          deleteWordFromList(this.selection, this.valid_words);
          if (allWordsAreFound(this.valid_words)) {
            this.game_over = 1;
          }
          this.is_paused = 1;
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
    resumeGame: function() {
      this.is_paused = 0;
    },
    
    highlightSelection: function(row, col) {
      if (this.click_state == 0 || this.click_state == 1) {
        clearPrevHighlight(this.rows, this.x1, this.y1, this.x_hover, this.y_hover);
        this.x_hover = row;
        this.y_hover = col;
        if (this.click_state == 0)
          setNewHighlight(this.rows, this.x1, this.y1, this.x_hover, this.y_hover);
      }
    },
    checkClick(row, col) {
      if (this.click_state == 1)
        return (false);
      if (row == this.x1 && col == this.y1)
        return (true);
      return (false);
    }
  },
  components: {
    Letter,
    WordList,
  },
  props: ['valid_words', 'rows', 'restartGame'],
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
#restart {
  cursor: pointer;
  background-color: brown;
  font-size: 22px;
  padding: 20px;
  margin-left: 0px;
}
</style>

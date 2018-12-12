

<template>

  <div id="app">
    <div id = "game-board">
      <h1>Crossword Puzzle</h1>  
      <ul v-for="(row, row_index) in rows">
        <li v-on:click="handleClick(row_index, col_index)" v-for="(letter, col_index) in row">
          <letter v-bind:char=letter.letter v-bind:found=letter.is_found :key="letter_key"></letter>
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

Vue.component('letter', Letter);
Vue.component('word-list', WordList);




let isValidWord = function(selection, valid_words) {
  let n = valid_words.length;
  for (let i = 0; i < n; i++) {
    if (valid_words[i].str === selection) {
      return (true);
    }
  }
  return (false);  
}

let deleteWordFromList = function(selection, valid_words) {
  let n = valid_words.length;
  for (let i = 0; i < n; i++) {
    if (valid_words[i].str === selection) {
      valid_words[i].found_state = 1;
    }
  }
}

let toMatrix = (arr, width) => 
    arr.reduce((rows, key, index) => (index % width == 0 ? rows.push([key]) 
      : rows[rows.length-1].push(key)) && rows, []);


let initGame = function(input_str) {
  let matrix = toMatrix(input_str.split('').map((x) => ({ letter: x, is_found: 0 })), 17); 
  return (matrix);
}

export default {
  name: 'app',
  data () {

    let input_str = 
      "cardefghijklmnopi" + 
      "nstuiwxyzxhxxxbmt" + 
      "mpxxxaxxxxgxxwaxy" + 
      "ejxxxxgxxxsxhishm" + 
      "xxxxxxxonxlxqndus" + 
      "pixxxxxynxlxqndus" + 
      "elxxxxxkxakxaeusb" +
      "rzxxxxxsxxlxksxxr" + 
      "ipxhelloworldswec" + 
      "esxxcsxdxxoxjxyxy" + 
      "nsxxjdxkxxlxyxrbi" + 
      "chxxjyxmxxpxwxeng" + 
      "egxxdkxrxxexsxvwb" + 
      "doxxwwxjxxhxtedhj" + 
      "eppxjaxnxxjxrxins" + 
      "koxxuxxzxxssxxkje" +
      "tvxenigmaxexaffdy";
    
    const valid_words = [
      { str: 'helloworld', found_state: 0 },
      { str: 'hello', found_state: 0 }, 
      { str: 'world', found_state: 0 },
      { str: 'enigma', found_state: 0 },
      { str: 'house', found_state: 0 },
      { str: 'experience', found_state: 0 },
      { str: 'car', found_state: 0 },
      { str: 'witness', found_state: 0 },
      { str: 'diagonal', found_state: 0 },
      { str: 'top', found_state: 0 },
      
    ];
      
    return {
      x1: -1,
      x2: -1,
      y1: -1,
      y2: -1,
      click_state: -1,
      valid_words: valid_words,
      letter_key: 0,
      input_str: input_str,
      rows: [],
      selection: "",
    }
  },
  created: function () {
    this.rows = initGame(this.input_str);
  },
  methods: {
    handleClick: function(row, col) {
      console.log(this.rows);
      console.log(row, col);
      
      if (this.click_state == - 1) {
        this.x1 = row;
        this.y1 = col;
        this.click_state = 0;
      }
      else if (this.click_state == 0) {
        this.x2 = row;
        this.y2 = col;
        this.click_state = 1;
        this.selection = walkWord(this.rows, this.x1, this.y1, this.x2, this.y2, false);
        console.log("selection: " + this.selection);
        if (isValidWord(this.selection, this.valid_words)) {
          walkWord(this.rows, this.x1, this.y1, this.x2, this.y2, true);
          deleteWordFromList(this.selection, this.valid_words);
          this.letter_key += 1;
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
  }
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

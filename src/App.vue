
<template>
  <game v-bind:valid_words="valid_words" v-bind:rows="rows" />
</template>

<script>
import Vue from 'vue'
import Game from './Game.vue';
import { walkWord } from './walkBoard.js';
import { isValidWord, deleteWordFromList } from './manageWordList.js';
import { SET, CHECK, HORIZONTAL, VERTICAL, DIAG_UP, DIAG_DOWN } from './constants.js';

let calcCoords = function(word, orientation, row, col) {
  if (orientation == HORIZONTAL) {
    return ({ x2: row + word.length - 1, y2: col });
  } else if (orientation == VERTICAL) {
    return ({ x2: row, y2: col + word.length - 1 });
  } else if (orientation == DIAG_UP) {
    return ({ x2: row + word.length - 1, y2: col - word.length - 1 })
  } else if (orientation == DIAG_DOWN) {
    return ({ x2: row + word.length - 1, y2: col + word.length - 1 });
  }
}

let invalidCoords = function(x1, y1, x2, y2) {
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

let randomPlaceWords = function(matrix, valid_words) {
  for (let i = 0; i < valid_words.length; i++) {
    while (1) {
      let row = Math.floor(Math.random() * 17);
      let col = Math.floor(Math.random() * 17);
      let orientation = Math.floor(Math.random() * 4); // horizontal, vertical, diagonal up, diagonal down
      let reverse_word = Math.floor(Math.random() * 2); // word in reverse order or not 
      let x2y2 = calcCoords(valid_words[i].str, orientation, row, col);
      let word = reverse_word ? valid_words[i].str.split("").reverse().join("") : valid_words[i].str;
      if (invalidCoords(row, col, x2y2.x2, x2y2.y2)) {
        continue ;
      }
      if (walkWord(matrix, row, col, x2y2.x2, x2y2.y2, word, CHECK)) {  
        walkWord(matrix, row, col, x2y2.x2, x2y2.y2, word, SET);
        break ;
      }
    }
  }
}

let toMatrix = (arr, width) => 
    arr.reduce((rows, key, index) => (index % width == 0 ? rows.push([key]) 
      : rows[rows.length-1].push(key)) && rows, []);

let initGame = function(input_str, valid_words) {
  let matrix = toMatrix(input_str.split('').map((x) => 
    ({ letter: x, is_found: 0, is_part_of_word: 0 })), 17);
  randomPlaceWords(matrix, valid_words);
  return (matrix);
}

let randomString = function() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (var i = 0; i < 17*17; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export default {
  name: 'app',
  data () {
    let input_str = randomString();    
    const valid_words = [
      { str: 'APPLE', found_state: 0 },
      { str: 'ORANGE', found_state: 0 }, 
      { str: 'KEBAB', found_state: 0 },
      { str: 'COCKTAIL', found_state: 0 },
      { str: 'MUSIC', found_state: 0 },
      { str: 'BEACH', found_state: 0 },
      { str: 'HOMEWORK', found_state: 0 },
      { str: 'WILDLIFE', found_state: 0 },
      { str: 'FOOD', found_state: 0 },
    ];
    return {
      valid_words: valid_words,
      input_str: input_str,
      rows: [],
    }
  },
  created: function () {
    this.rows = initGame(this.input_str, this.valid_words);
  },
  components: {
    Game,
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

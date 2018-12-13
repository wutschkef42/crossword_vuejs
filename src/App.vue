
<template>
  <game v-if=game_is_running v-bind:valid_words="valid_words" v-bind:rows="rows" />
  <button v-else @click="startGame" id="start-button">Start Game</button>
</template>

<script>
import Vue from 'vue'
import Game from './Game.vue';
import { walkWord } from './walkBoard.js';
import { initWordList, isValidWord, deleteWordFromList } from './manageWordList.js';
import { SET, CHECK, HORIZONTAL, VERTICAL, DIAG_UP, DIAG_DOWN } from './constants.js';

/*
** (row, col) is the leftmost coordinate of the word on the map
** orientation is either horizontal, vertical or diagonal
** function returns the rightmost coordinate of the word on the map
*/

let calcCoords = (word, orientation, row, col) => {
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

/*
** valid coordinates are between 0 and 16
** and lie horizontally, vertically or diagonally on the map
**/

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
** randomly distribute the list of words on the map
** generate random coordinates, random orientations and optionally reverse word
*/

let randomPlaceWords = (matrix, valid_words) => {
  for (let i = 0; i < valid_words.length; i++) {
    while (1) {
      let row = Math.floor(Math.random() * 17);
      let col = Math.floor(Math.random() * 17);
      let orientation = Math.floor(Math.random() * 4);
      let reverse_word = Math.floor(Math.random() * 2);
      let x2y2 = calcCoords(valid_words[i].str, orientation, row, col);
      let word = reverse_word ? valid_words[i].str.split("").
        reverse().join("") : valid_words[i].str;
      if (invalidCoords(row, col, x2y2.x2, x2y2.y2))
        continue ;
      if (walkWord(matrix, row, col, x2y2.x2, x2y2.y2, word, CHECK)) {  
        walkWord(matrix, row, col, x2y2.x2, x2y2.y2, word, SET);
        break ;
      }
    }
  }
}

/* 
** convert one-dimensional array to two-dimensional array
** with width-many elements per row
*/

let toMatrix = (arr, width) => 
    arr.reduce((rows, key, index) => (index % width == 0 ? rows.push([key]) 
      : rows[rows.length-1].push(key)) && rows, []);


/*
** take list of words and random input string
** generate map with randomly distributed words
*/

let initGame = (input_str, valid_words) => {
  let matrix = toMatrix(input_str.split('').map((x) => 
    ({ letter: x, is_found: 0, is_part_of_word: 0 })), 17);
  randomPlaceWords(matrix, valid_words);
  return (matrix);
}

/*
** generate random string with enough characters to fill map
*/

let randomString = () => {
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
    const words = [
      'APPLE', 'ORANGE', 'kebab', '$$$', 'BeaCH', 'Racecar', 'HOUSTON',
      'DEEPfried', 'Helicopter', 'WILDLIFE'
    ];
    return {
      valid_words: initWordList(words),
      input_str: input_str,
      rows: [],
      game_is_running: 0,
    }
  },
  created: function () {
    this.rows = initGame(this.input_str, this.valid_words);
  },
  components: {
    Game,
  },
  methods: {
    startGame: function() {
      this.game_is_running = 1;
    },
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
#start-button {
  display: block;
  height: 60px;
  width: 200px;
  margin: 0 auto;
  margin-top: 50%;
  font-size: 22px;
  cursor: pointer;  
}
</style>

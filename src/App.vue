

<template>

  <game v-bind:valid_words="valid_words" v-bind:rows="rows" />

</template>


<script>

import Vue from 'vue'
import Game from './Game.vue';
import { walkWord } from './walkBoard.js';
import {isValidWord, deleteWordFromList } from './manageWordList.js';

Vue.component('game', Game);

let tryPosition = function(matrix, word, row, col) {

}

let placeWord = function(matrix, word, row, col) {

}

// randomly choose coordinates for leftmost character, choose an orientation, test if the word fits without overlapping other words, if yes insert
// todo: integrate vueX, get word list as user input, restart game when all words are found, figure out last sentence:

/* Au lancement, le jeu ne doit pas être visible et les mots à trouver ne sont pas encore connus. 
Son apparition est déclenchée par une action qui entre les données (les mots à trouver). 
Lorsqu'un mot est trouvé, une action spécifique peut être lancée qui met le jeu en pause. 
Lorsque tous les mots sont trouvés, une action spécifique peut être lancée, avant de faire disparaître le jeu. 
On peut ensuite relancer une autre grilles de mots.
*/

let randomPlaceWords = function(matrix, valid_words) {
  for (let i = 0; i < valid_words.length; i++) {
    while (1) {
      let row = Math.floor(Math.random() * 17);
      let col = Math.floor(Math.random() * 17);
      let orientation = Math.floor(Math.random() * 4); // horizontal, vertical, diagonal up, diagonal down
      let reverse_word = Math.floor(Math.random() * 2); // word in reverse order or not 
      if (tryPosition(matrix, valid_words[i], row, col)) {
        placeWord(matrix, valid_words[i], row, col);
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
  //randomPlaceWords(matrix, valid_words);
  return (matrix);
}

let randomString = function() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (var i = 0; i < 17*17; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}


export default {
  name: 'app',
  data () {

    let input_str = //randomString();
    
      "cardefghijklmnopi" + 
      "nstuiwxyzxhxxxbmt" + 
      "mpxxxaxxxxgxxwaxy" + 
      "ejxxxxgxxxsxhishm" + 
      "xxxxxxxonxlxqtdos" + 
      "pixxxxxynxlxqndus" + 
      "elxxxxxkxakxaeusb" +
      "rzxxxxxsxxlxksxer" + 
      "ipxhelloworldswec" + 
      "esxxcsxdxxoxjxyxy" + 
      "nsxxjdxkxxlxyxrbi" + 
      "chxxjyxmxxpxwxeng" + 
      "egxxdkxrxxexsxvwb" + 
      "doxxwwxtxxhxtedhj" + 
      "eppxjaxnaxjxrxins" + 
      "koxxuxxzxhssxxkje" +
      "tvxenigmaxwxrepus";
    
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
      { str: 'super', found_state: 0 },
      { str: 'what', found_state: 0 },
      
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

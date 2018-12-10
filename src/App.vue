

<template>

  <div id="app">
    <div id = "game-board">
      <h1>Crossword Puzzle</h1>  
      <ul v-for="(row, row_index) in rows">
        <li v-on:click="handleClick(row_index, col_index)" v-for="(letter, col_index) in row">
          <letter v-bind:char=letter v-bind:found="is_found[row_index][col_index]" :key="letter_key"></letter>
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

Vue.component('letter', Letter);
Vue.component('word-list', WordList);

let checkCoords = function(x1, y1, x2, y2) {
  if (x1 != x2 && y1 != y2 || x1 == x2 && y1 == y2) {
    return (false);
  } else {
    return (true);
  }
}

let checkSolution = function(rows, x1, y1, x2, y2, valid_words) {
  let selection = ""; 
  let tmp;

  if (x1 == x2) {
    if (y1 > y2) {
      tmp = y1;
      y1 = y2;
      y2 = tmp;
    }
    while (y1 <= y2) {
      selection += rows[x1][y1];
      y1++;
    }
  } else {
    if (x1 > x2) {
      tmp = x1;
      x1 = x2;
      x2 = tmp;
    }
    while (x1 <= x2) {
      selection += rows[x1][y1];
      x1++;
    }
  }
  let n = valid_words.length;
  for (let i = 0; i < n; i++) {
    if (valid_words[i].str === selection) {
      return (true);
    }
  }
  return (false);  
}

let deleteWordFromList = function(rows, x1, y1, x2, y2, valid_words) {
  let selection = ""; 
  let tmp;

  if (x1 == x2) {
    if (y1 > y2) {
      tmp = y1;
      y1 = y2;
      y2 = tmp;
    }
    while (y1 <= y2) {
      selection += rows[x1][y1];
      y1++;
    }
  } else {
    if (x1 > x2) {
      tmp = x1;
      x1 = x2;
      x2 = tmp;
    }
    while (x1 <= x2) {
      selection += rows[x1][y1];
      x1++;
    }
  }  
  let n = valid_words.length;
  for (let i = 0; i < n; i++) {
    if (valid_words[i].str === selection) {
      valid_words[i].found_state = 1;
    }
  }
}

let markAsFound = function(is_found, x1, y1, x2, y2) {
  if (x1 == x2) {
    while (y1 <= y2) {
      is_found[x1][y1] = 1;
      y1++;
    }
  } else {
    while (x1 <= x2) {
      is_found[x1][y1] = 1;
      x1++;
    }
  }
}

let checkWinner = function(rows, x1, y1, x2, y2, valid_words) {

  if (checkCoords(x1, y1, x2, y2) 
      && checkSolution(rows, x1, y1, x2, y2, valid_words)) {
    return (true);
  }
  return (false);
};

let markWinner = function(rows, x1, y1, x2, y2, is_found) {
  let tmp;

  if (x1 == x2) {
    if (y1 > y2) {
      tmp = y1;
      y1 = y2;
      y2 = tmp;
    }
    while (y1 <= y2) {
      is_found[x1][y1] = 1;
      y1++;
    }
  } else {
    if (x1 > x2) {
      tmp = x1;
      x1 = x2;
      x2 = tmp;
    }
    while (x1 <= x2) {
      is_found[x1][y1] = 1;
      x1++;
    }
  }
}

export default {
  name: 'app',
  data () {
    
    const rows = 
      [
        [ 'c', 'a', 'r', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'i' ],
        [ 'n', 's', 't', 'u', 'i', 'w', 'x', 'y', 'z', 'x', 'h', 'x', 'x', 'x', 'b', 'm', 't' ],
        [ 'm', 'p', 'x', 'x', 'x', 'a', 'x', 'x', 'x', 'x', 'g', 'x', 'x', 'w', 'a', 'x', 'y' ],
        [ 'e', 'j', 'x', 'x', 'x', 'x', 'g', 'x', 'x', 'x', 's', 'x', 'h', 'i', 's', 'h', 'm' ],
        [ 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'o', 'x', 'x', 'a', 'x', 'g', 't', 'x', 'o', 'u' ],
        [ 'p', 'i', 'x', 'x', 'x', 'x', 'x', 'y', 'n', 'x', 'l', 'x', 'q', 'n', 'd', 'u', 's' ],
        [ 'e', 'l', 'x', 'x', 'x', 'x', 'x', 'k', 'x', 'a', 'k', 'x', 'a', 'e', 'u', 's', 'b' ],
        [ 'r', 'z', 'x', 'x', 'x', 'x', 'x', 's', 'x', 'x', 'l', 'x', 'k', 's', 'x', 'x', 'r' ],
        [ 'i', 'p', 'x', 'h', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd', 's', 'w', 'e', 'c' ],
        [ 'e', 's', 'x', 'x', 'c', 's', 'x', 'd', 'x', 'x', 'o', 'x', 'j', 'x', 'y', 'x', 'y' ],
        [ 'n', 's', 'x', 'x', 'j', 'd', 'x', 'k', 'x', 'x', 'l', 'x', 'y', 'x', 'r', 'b', 'i' ],
        [ 'c', 'h', 'x', 'x', 'j', 'y', 'x', 'm', 'x', 'x', 'p', 'x', 'w', 'x', 'e', 'n', 'g' ],
        [ 'e', 'g', 'x', 'x', 'd', 'k', 'x', 'r', 'x', 'x', 'e', 'x', 's', 'x', 'v', 'w', 'b' ],
        [ 'd', 'o', 'x', 'x', 'w', 'w', 'x', 'j', 'x', 'x', 'h', 'x', 't', 'e', 'd', 'h', 'j' ],
        [ 'f', 'p', 'x', 'x', 'j', 'a', 'x', 'n', 'x', 'x', 'j', 'x', 'r', 'x', 'i', 'n', 's' ],
        [ 'k', 'a', 'x', 'x', 'u', 'x', 'x', 'z', 'x', 'x', 's', 's', 'x', 'x', 'k', 'j', 'e' ],
        [ 'l', 'v', 'x', 'e', 'n', 'i', 'g', 'm', 'a', 'x', 'e', 'x', 'a', 'f', 'f', 'd', 'y' ], 
      ];
      let is_found = 
      [
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
      ];
    
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
      { str: 'inverse', found_state: 0 },
    ];
    
    let x1 = -1;
    let y1 = -1;
    let x2 = -1;
    let y2 = -1;
    let click_state = -1;
    
    
    return {
      x1: x1,
      x2: x2,
      y1: y1,
      y2: y2,
      click_state: click_state,
      valid_words: valid_words,
      is_found: is_found,
      rows: rows,
      letter_key: 0,
    }
  },
  methods: {
    handleClick: function(row, col) {
      let tmp;
      if (this.click_state == - 1) {
        this.x1 = row;
        this.y1 = col;
        this.click_state = 0;
      }
      else if (this.click_state == 0) {
        this.x2 = row;
        this.y2 = col;
        this.click_state = 1;
        if (checkWinner(this.rows, this.x1, this.y1, this.x2, this.y2, this.valid_words)) {
          markWinner(this.rows, this.x1, this.y1, this.x2, this.y2, this.is_found);    
          deleteWordFromList(this.rows, this.x1, this.y1, this.x2, this.y2, this.valid_words);
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
  padding: 0 5px;
  margin: 0;
  font-size: 28px;
  
}
a {
  color: #42b983;
}

#game-board {
  float: left;
  width: 800px;
}

#words {
  float: left;
  padding-left: 40px;
  padding-top: 100px;
}

#list-header {
  text-decoration: underline;
}

</style>

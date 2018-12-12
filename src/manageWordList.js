
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
  
  export { isValidWord, deleteWordFromList };
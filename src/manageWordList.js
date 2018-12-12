
let isValidWord = function(selection, valid_words) {
    let rev_selection = selection.split("").reverse().join("");
    let n = valid_words.length;
    for (let i = 0; i < n; i++) {
      if (valid_words[i].str === selection || valid_words[i].str === rev_selection) {
        return (true);
      }
    }
    return (false);  
  }
  
  let deleteWordFromList = function(selection, valid_words) {
    let rev_selection = selection.split("").reverse().join("");
    let n = valid_words.length;
    for (let i = 0; i < n; i++) {
      if (valid_words[i].str === selection || valid_words[i].str === rev_selection) {
        valid_words[i].found_state = 1;
      }
    }
  }
  
  export { isValidWord, deleteWordFromList };
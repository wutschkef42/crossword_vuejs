
/*
** take array of words and convert each word into object with 
** a flag that keeps track of the word state
*/

let initWordList = (valid_words) => {
  return (valid_words.map((x) => ({ str: x.toUpperCase(), found_state: 0 })));
}

/*
** check if selected word matches one of the valid words
*/

let isValidWord = function(selection, valid_words) {
    let rev_selection = selection.split("").reverse().join("");
    let n = valid_words.length;
    for (let i = 0; i < n; i++) {
      if (valid_words[i].str === selection || valid_words[i].str === rev_selection)
        return (true);
    }
    return (false);  
  }
  
/*
** delete selected word from list of valid words
*/

let deleteWordFromList = function(selection, valid_words) {
  let rev_selection = selection.split("").reverse().join("");
  let n = valid_words.length;
  for (let i = 0; i < n; i++) {
    if (valid_words[i].str === selection || valid_words[i].str === rev_selection)
      valid_words[i].found_state = 1;
  }
}

export { initWordList, isValidWord, deleteWordFromList };
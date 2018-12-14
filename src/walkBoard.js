
import { HIGHLIGHT, CHECK, SET, CLEAR_HIGHLIGHT, SET_HIGHLIGHT } from './constants.js'


/*
** traversal logic of the game.
** has 6 different options (op_code)
**  - SELECT select a word between coords (x1, y1) and (x2, y2)
**  - HIGHLIGHT highlight a word between coords (x1, y1) and (x2, y2)
**  - CHECK check if a word fits on the map between (x1, y1) and (x2, y2)
**  - SET place a word on the map between (x1, y1) and (x2, y2)
**  - SET_HIGHLIGHT mark the current selection on mouseover
**  - CLEAR_HIGHLIGHT delete the current selection on new mouseover
** the function is used to generate the map from the list of valid words
** it is also used during gameplay, to access user selected words and 
** highlight them if necessary
*/

let walkWord = (rows, x1, y1, x2, y2, word = "", op_code) => {
  let selection = "";
  let tmp;
  let positionOk = true;
  let arr_word = word.split('');
  let i = 0;

  if (x1 > x2) {
    tmp = x1;
    x1 = x2;
    x2 = tmp;
    tmp = y1;
    y1 = y2;
    y2 = tmp;
  }
  while (x1 < x2) {
    selection += rows[x1][y1].letter;
    rows[x1][y1].is_found = op_code == HIGHLIGHT ? 1 : rows[x1][y1].is_found;
    positionOk = rows[x1][y1].is_part_of_word ? false : true;
    if (!positionOk && op_code == CHECK)
      return false;
    rows[x1][y1].letter = op_code == SET ? arr_word[i++] : rows[x1][y1].letter;
    rows[x1][y1].is_part_of_word = op_code == SET ? 1 : rows[x1][y1].is_part_of_word;
    rows[x1][y1].is_selected = op_code == CLEAR_HIGHLIGHT ? 0 : rows[x1][y1].is_selected;
    rows[x1][y1].is_selected = op_code == SET_HIGHLIGHT ? 1 : rows[x1][y1].is_selected;
    if (y1 < y2)
      y1++;
    else if (y1 > y2)
      y1--;
    x1++;
  }
  while (y1 != y2) {
    selection += rows[x1][y1].letter;
    rows[x1][y1].is_found = op_code == HIGHLIGHT ? 1 : rows[x1][y1].is_found;
    positionOk = rows[x1][y1].is_part_of_word ? false : true;
    if (!positionOk && op_code == CHECK)
      return false;
    rows[x1][y1].letter = op_code == SET ? arr_word[i++] : rows[x1][y1].letter;
    rows[x1][y1].is_part_of_word = op_code == SET ? 1 : rows[x1][y1].is_part_of_word;
    rows[x1][y1].is_selected = op_code == CLEAR_HIGHLIGHT ? 0 : rows[x1][y1].is_selected;
    rows[x1][y1].is_selected = op_code == SET_HIGHLIGHT ? 1 : rows[x1][y1].is_selected;
    if (y1 < y2)
      y1++;
    else
      y1--;
  }
  selection += rows[x1][y1].letter;
  rows[x1][y1].is_found = op_code == HIGHLIGHT ? 1 : rows[x1][y1].is_found;
  positionOk = rows[x1][y1].is_part_of_word ? false : true;
  if (!positionOk && op_code == CHECK)
    return false;
  rows[x1][y1].letter = op_code == SET ? arr_word[i++] : rows[x1][y1].letter;
  rows[x1][y1].is_part_of_word = op_code == SET ? 1 : rows[x1][y1].is_part_of_word;
  rows[x1][y1].is_selected = op_code == CLEAR_HIGHLIGHT ? 0 : rows[x1][y1].is_selected;
  rows[x1][y1].is_selected = op_code == SET_HIGHLIGHT ? 1 : rows[x1][y1].is_selected;
  return (op_code == CHECK ? positionOk : selection);
}

export { walkWord };
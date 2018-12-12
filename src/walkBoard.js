
let walkHorizontal = function(rows, x1, y1, x2, y2, highlight_it) {
    let selection = ""; 
    let tmp;
  
    if (y1 > y2) {
      tmp = y1;
      y1 = y2;
      y2 = tmp;
    }
    while (y1 <= y2) {
      selection += rows[x1][y1].letter;
      rows[x1][y1].is_found = highlight_it ? 1 : 0;
      y1++;
    }
    return (selection);
  }
  
  let walkVertical = function(rows, x1, y1, x2, y2, highlight_it) {
    let selection = ""; 
    let tmp;
  
    if (x1 > x2) {
      tmp = x1;
      x1 = x2;
      x2 = tmp;
    }
    while (x1 <= x2) {
      selection += rows[x1][y1].letter;
      rows[x1][y1].is_found = highlight_it ? 1 : 0;
      x1++;
    }
    return (selection);
  }
  
  let WalkDiagonalDown = function(rows, x1, y1, x2, y2, highlight_it) {
    let selection = "";
    let tmp;
  
    if (x1 > x2) {
      while (x2 <= x1) {
        selection += rows[x2][y2].letter;
        rows[x2][y2].is_found = highlight_it ? 1 : 0;
        x2++;
        y2++;
      }
    } else {
      while (x1 <= x2) {
        selection += rows[x1][y1].letter;
        rows[x1][y1].is_found = highlight_it ? 1 : 0;
        x1++;
        y1++;
      }
    }
    return (selection);
  }
  
  let WalkDiagonalUp = function(rows, x1, y1, x2, y2, highlight_it) {
    let selection = "";
    let tmp;
  
    if (x1 > x2) {
      while (x1 >= x2) {
        selection += rows[x1][y1].letter;
        rows[x1][y1].is_found = highlight_it ? 1 : 0;
        x1--;
        y1++;
      }
    } else {
      while (x1 <= x2) {
        selection += rows[x2][y2].letter;
        rows[x2][y2].is_found = highlight_it ? 1 : 0;
        x2--;
        y2++;
      }
    }
    return (selection);
    
  }
  
  let walkDiagonal = function(rows, x1, y1, x2, y2, highlight_it) { 
    if ((x1 > x2 && y1 > y2) || (x2 > x1 && y2 > y1)) {
      return (WalkDiagonalDown(rows, x1, y1, x2, y2, highlight_it));
    } else {
      return (WalkDiagonalUp(rows, x1, y1, x2, y2, highlight_it));
    }
  }
  
  let walkWord = function(rows, x1, y1, x2, y2, highlight_it) {
    
    let tmp;
  
    if (x1 == x2 && y1 != y2) {
      return (walkHorizontal(rows, x1, y1, x2, y2, highlight_it));
    } else if (y1 == y2 && x1 != x2) {
      return (walkVertical(rows, x1, y1, x2, y2, highlight_it));    
    } else if (Math.abs(x1 - x2) == Math.abs(y1 - y2)) {
      return (walkDiagonal(rows, x1, y1, x2, y2, highlight_it));
    }
    console.log(selection);
    return (selection);
  }

  export { walkWord };
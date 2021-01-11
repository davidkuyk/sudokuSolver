class SudokuSolver {

  validate(puzzleString) {

    let puzzleObj = {
    }

    let rowNum = 1;
    let colNum = 1;
    let regNum = 1;

    for(var index=1; index<=81; index++){
      puzzleObj[index] = {}
      // row
      puzzleObj[index].row = rowNum;
      puzzleObj[index].rowLetter = (rowNum + 9).toString(36).toUpperCase();
      // col
      puzzleObj[index].column = colNum;
      // region
      let region1 = [0, 1, 2, 9, 10, 11, 18, 19, 20];
      let region2 = [3, 4, 5, 12, 13, 14, 21, 22, 23];
      let region3 = [6, 7, 8, 15, 16, 17, 24, 25, 26];
      let region4 = [27, 28, 29, 36, 37, 38, 45, 46, 47];
      let region5 = [30, 31, 32, 39, 40, 41, 48, 49, 50];
      let region6 = [33, 34, 35, 42, 43, 44, 51, 52, 53];
      let region7 = [54, 55, 56, 63, 64, 65, 72, 73, 74];
      let region8 = [57, 58, 59, 66, 67, 68, 75, 76, 77];
      let region9 = [60, 61, 62, 69, 70, 71, 78, 79, 80];

      if(region1.includes(index-1)) {
        puzzleObj[index].region = 1;
      } else if (region2.includes(index-1)) {
        puzzleObj[index].region = 2;
      }else if (region3.includes(index-1)) {
        puzzleObj[index].region = 3;
      }else if (region4.includes(index-1)) {
        puzzleObj[index].region = 4;
      }else if (region5.includes(index-1)) {
        puzzleObj[index].region = 5;
      }else if (region6.includes(index-1)) {
        puzzleObj[index].region = 6;
      }else if (region7.includes(index-1)) {
        puzzleObj[index].region = 7;
      }else if (region8.includes(index-1)) {
        puzzleObj[index].region = 8;
      }else if (region9.includes(index-1)) {
        puzzleObj[index].region = 9;
      }
      // value
      puzzleObj[index].value = puzzleString.puzzle[index-1];
      //iterate the row, column
      if (colNum < 9) {
        colNum += 1
      } else {
        colNum = 1
        rowNum+= 1
      }
  }

    function checkRowPlacement(currentRow, digit) {
      var rowValueArray = [];
      for(var index=1; index<=81; index++){
        if (puzzleObj[index].rowLetter == currentRow) {
          rowValueArray.push(puzzleObj[index].value);
        }
      };
      console.log('rowValueArray: ' + rowValueArray);
      if (rowValueArray.includes(digit)) {
        console.log('rowCheck true: ' + digit)
        return true;
      } else {
        return false;
      }
    }

    function checkColPlacement(currentColumn, digit) {
      var colValueArray = [];
      for(var index=1; index<=81; index++){
        if (puzzleObj[index].column == currentColumn) {
          colValueArray.push(puzzleObj[index].value)
        }
      }
      console.log('colValueArray: ' + colValueArray)
      console.log(digit + ' ' + typeof(digit))
      if (colValueArray.includes(digit)) {
        console.log('colCheck true: ' + digit)
        return true;
      } else {
        return false;
      }
  }

  function checkRegionPlacement(currentRegion, digit) {
    var regValueArray = []
      for(var index=1; index<=81; index++){
        if (puzzleObj[index].region == currentRegion) {
          regValueArray.push(puzzleObj[index].value)
        }
      }
      if (regValueArray.includes(digit)) {
        console.log('regCheck true: ' + digit)
        return true;
      } else {
        console.log('regCheck false: ' + digit)
        return false;
      }
  }

    if (/[^1-9\.]/g.test(puzzleString.puzzle) == true) {
      console.log(puzzleString.puzzle);
      return {error: 'Invalid characters in puzzle'}
    }

    if (puzzleString.puzzle.length !== 81) {
      console.log(puzzleString.puzzle.length);
      return {error: 'Expected puzzle to be 81 characters long'}
    }

     if(/^[A-I][1-9]$/.test(puzzleString.coordinate) == false) {
        return {error: 'Invalid coordinate'}
    }

      if (/^[1-9]$/.test(puzzleString.value) == false) {
        return {error: 'Invalid value'}
      }

      let validationObject = {valid: undefined, conflict: []}
      let invalidCount = 0;

      //console.log(puzzleString.coordinate[0] + ' ' +  puzzleString.value)
      if(checkRowPlacement(puzzleString.coordinate[0], puzzleString.value.toString()) == true) {
        validationObject.conflict.push("row")
        invalidCount += 1;
      }

      console.log(puzzleString.coordinate[1] + ' ' +  puzzleString.value)
      if(checkColPlacement(puzzleString.coordinate[1], puzzleString.value.toString()) == true) {
        validationObject.conflict.push("column")
        invalidCount += 1;
      }

      let regionOfCoord = Object.keys(puzzleObj).find(key => puzzleObj[key].rowLetter == puzzleString.coordinate[0] && puzzleObj[key].column == puzzleString.coordinate[1]);

      //console.log(puzzleObj[regionOfCoord].region + ' ' + puzzleString.value)
      if(checkRegionPlacement(puzzleObj[regionOfCoord].region, puzzleString.value.toString()) == true) {
        validationObject.conflict.push("region")
        invalidCount += 1;
      }

      if (invalidCount > 0) {
        validationObject.valid = false;
      } else {
        delete validationObject.conflict;
        validationObject.valid = true;
      }

      return validationObject

  }

  solve(puzzleString) {

    if (/[^0-9\.]/g.test(puzzleString)) {
      return {error: 'Invalid characters in puzzle'}
    }

    if (puzzleString.length !== 81) {
      return { error: 'Expected puzzle to be 81 characters long' }
    }
    
    function checkRowPlacement(currentRow, digit) {
      var rowValueArray = [];
      for(var index=1; index<=81; index++){
        if (puzzleObj[index].row == currentRow) {
          rowValueArray.push(puzzleObj[index].value);
        }
      };
      if (rowValueArray.includes(digit)) {
        console.log('rowCheck true: ' + digit)
        return true;
      } else {
        return false;
      }
    }

    function checkColPlacement(currentColumn, digit) {
      var colValueArray = []
      for(var index=1; index<=81; index++){
        if (puzzleObj[index].column == currentColumn) {
          colValueArray.push(puzzleObj[index].value)
        }
      }
      if (colValueArray.includes(digit)) {
        console.log('colCheck true: ' + digit)
        return true;
      } else {
        return false;
      }
  }

  function checkRegionPlacement(currentRegion, digit) {
    var regValueArray = []
      for(var index=1; index<=81; index++){
        if (puzzleObj[index].region == currentRegion) {
          regValueArray.push(puzzleObj[index].value)
        }
      }
      if (regValueArray.includes(digit)) {
        console.log('regCheck true: ' + digit)
        return true;
      } else {
        console.log('regCheck false: ' + digit)
        return false;
      }
  }
 
    let puzzleObj = {
    }

    let rowNum = 1;
    let colNum = 1;
    let regNum = 1;

    for(var index=1; index<=81; index++){
      // go through all 81 cells and give each the correct row (1-9), column(1-9), region (1-9) and value (puzzleString.substring(startCol, endCol))
      puzzleObj[index] = {}
      // row
      puzzleObj[index].row = rowNum;
      puzzleObj[index].rowLetter = (rowNum + 9).toString(36).toUpperCase();
      // col
      puzzleObj[index].column = colNum;
      // region
      let region1 = [0, 1, 2, 9, 10, 11, 18, 19, 20];
      let region2 = [3, 4, 5, 12, 13, 14, 21, 22, 23];
      let region3 = [6, 7, 8, 15, 16, 17, 24, 25, 26];
      let region4 = [27, 28, 29, 36, 37, 38, 45, 46, 47];
      let region5 = [30, 31, 32, 39, 40, 41, 48, 49, 50];
      let region6 = [33, 34, 35, 42, 43, 44, 51, 52, 53];
      let region7 = [54, 55, 56, 63, 64, 65, 72, 73, 74];
      let region8 = [57, 58, 59, 66, 67, 68, 75, 76, 77];
      let region9 = [60, 61, 62, 69, 70, 71, 78, 79, 80];

      if(region1.includes(index-1)) {
        puzzleObj[index].region = 1;
      } else if (region2.includes(index-1)) {
        puzzleObj[index].region = 2;
      }else if (region3.includes(index-1)) {
        puzzleObj[index].region = 3;
      }else if (region4.includes(index-1)) {
        puzzleObj[index].region = 4;
      }else if (region5.includes(index-1)) {
        puzzleObj[index].region = 5;
      }else if (region6.includes(index-1)) {
        puzzleObj[index].region = 6;
      }else if (region7.includes(index-1)) {
        puzzleObj[index].region = 7;
      }else if (region8.includes(index-1)) {
        puzzleObj[index].region = 8;
      }else if (region9.includes(index-1)) {
        puzzleObj[index].region = 9;
      }
      // value
      puzzleObj[index].value = puzzleString[index-1];
      //iterate the row, column
      if (colNum < 9) {
        colNum += 1
      } else {
        colNum = 1
        rowNum+= 1
      }
  }
        
    // iterate through puzzleObj
    let stillMoreToSolve = true;
    let timesAttempted = 0;
    let solution = '';

    while (stillMoreToSolve == true) { 
      for(var i=0; i<81; i++) {
        let possibleArray = []; 
        console.log('possibleArray cleared')   
        if (puzzleObj[i+1].value !== '.') {   
          console.log('already a number here: ' + puzzleObj[i+1].row + ' ' + puzzleObj[i+1].column + ' ' + puzzleObj[i+1].region);
        } else { // if it's a '.'
            for(var digit=1; digit<=9; digit++) {     
              console.log(puzzleObj[i+1].row + ' ' + puzzleObj[i+1].column + ' ' + puzzleObj[i+1].region)

              if(checkRowPlacement(puzzleObj[i+1].row, digit.toString()) == false &&  checkColPlacement(puzzleObj[i+1].column, digit.toString()) == false && checkRegionPlacement(puzzleObj[i+1].region, digit.toString()) == false) {
                possibleArray.push(digit.toString());
                console.log('possibleArray: ' + possibleArray + ' length: ' + possibleArray.length) 
              }
            }
            if (possibleArray.length == 1) { 
              console.log('found solution ' + possibleArray[0].toString() + ' at: ' + puzzleObj[i+1].row + ' ' + puzzleObj[i+1].column + ' ' + puzzleObj[i+1].region);
              puzzleObj[i+1].value = possibleArray[0].toString();
            } else if (possibleArray.length > 1) {
               console.log('Multiple possibilities. ' + possibleArray.length + 'Moving on...')
              } else {
                stillMoreToSolve = false;
                return {error: 'Puzzle cannot be solved'}
                console.log('possibleArray is logging a length of 0 after searching for 1-9. This should never happen.')
                break;
            }
          }
        }
        let checkMoreToSolve = 0;
        for(var i=0; i<81; i++) {  
          if (puzzleObj[i+1].value == '.') {
            checkMoreToSolve += 1;
            timesAttempted += 1;
            break;
          }
        }
        if (checkMoreToSolve == 0) {
          stillMoreToSolve = false;
        } 
        if (timesAttempted > 3) {
          return {error: 'Puzzle cannot be solved'}
        }
  }
  for(var i=0; i<81; i++) { 
    solution = solution.concat(puzzleObj[i+1].value.toString())
  }
  console.log('solution: ' + solution);
  console.log(puzzleObj)
  return {solution: solution}
 }
}

module.exports = SudokuSolver;
document.addEventListener('DOMContentLoaded', () =>  {

    // get the HTML elements into JS

    const gridDisplay = document.querySelector('.grid');
    const scoreDisplay = document.getElementById('score');
    const resultDisplay = document.getElementById('result');
    let gridArray = [];
    let score = 0;
  
    // create the board 

    function createBoard() {
        for (let i=0; i < 16; i++) {
            tile = document.createElement('div');
            tile.innerHTML = 0;
            gridDisplay.appendChild(tile);
            gridArray.push(tile);
        }
        addNumber();
        addNumber();
    }

    // initializes the game

    createBoard();
  
    // add a new number

    function addNumber() {
      randomNumber = Math.floor(Math.random() * gridArray.length);
        if (gridArray[randomNumber].innerHTML == 0) {
            gridArray[randomNumber].innerHTML = 2;
            checkLoss();
        }  else {
            addNumber();
        }
    }
  
    // move functions

    function moveRight() {
      for (let i=0; i < 16; i++) {
        if (i % 4 === 0) {
            let first = gridArray[i].innerHTML;
            let second = gridArray[i+ 1].innerHTML;
            let third = gridArray[i + 2].innerHTML;
            let fourth = gridArray[i + 3].innerHTML;
            let row = [parseInt(first), parseInt(second), parseInt(third), parseInt(fourth)];
            
            let hasVal = row.filter(num => num);
            let missing = 4 - hasVal.length;
            let empty = Array(missing).fill(0);
            let newRow = empty.concat(hasVal);
  
            gridArray[i].innerHTML = newRow[0];
            gridArray[i + 1].innerHTML = newRow[1];
            gridArray[i + 2].innerHTML = newRow[2];
            gridArray[i + 3].innerHTML = newRow[3];
        }
      }
    }
  
    function moveLeft() {
      for (let i=0; i < 16; i++) {
        if (i % 4 === 0) {
            let first = gridArray[i].innerHTML;
            let second = gridArray[i + 1].innerHTML;
            let third = gridArray[i + 2].innerHTML;
            let fourth = gridArray[i + 3].innerHTML;
            let row = [parseInt(first), parseInt(second), parseInt(third), parseInt(fourth)];
    
            let hasVal = row.filter(num => num);
            let missing = 4 - hasVal.length;
            let empty = Array(missing).fill(0);
            let newRow = hasVal.concat(empty);
    
            gridArray[i].innerHTML = newRow[0];
            gridArray[i + 1].innerHTML = newRow[1];
            gridArray[i + 2].innerHTML = newRow[2];
            gridArray[i + 3].innerHTML = newRow[3];
        }
      }
    }
  
  
    function moveUp() {
        for (let i=0; i < 4; i++) {
            let first = gridArray[i].innerHTML;
            let second = gridArray[i + 4].innerHTML;
            let third = gridArray[i + 8].innerHTML;
            let fourth = gridArray[i + 12].innerHTML;
            let column = [parseInt(first), parseInt(second), parseInt(third), parseInt(fourth)];
    
            let filteredColumn = column.filter(num => num);
            let missing = 4 - filteredColumn.length;
            let empty = Array(missing).fill(0);
            let newColumn = filteredColumn.concat(empty);
    
            gridArray[i].innerHTML = newColumn[0];
            gridArray[i + 4].innerHTML = newColumn[1];
            gridArray[i + 8].innerHTML = newColumn[2];
            gridArray[i + 12].innerHTML = newColumn[3];
        }
        }
  
    function moveDown() {
        for (let i=0; i < 4; i++) {
            let first = gridArray[i].innerHTML;
            let second = gridArray[i + 4].innerHTML;
            let third = gridArray[i + 8].innerHTML;
            let fourth = gridArray[i + 12].innerHTML;
            let column = [parseInt(first), parseInt(second), parseInt(third), parseInt(fourth)];
    
            let filteredColumn = column.filter(num => num);
            let missing = 4 - filteredColumn.length;
            let empty = Array(missing).fill(0);
            let newColumn = empty.concat(filteredColumn);
    
            gridArray[i].innerHTML = newColumn[0];
            gridArray[i + 4].innerHTML = newColumn[1];
            gridArray[i + 8].innerHTML = newColumn[2];
            gridArray[i + 12].innerHTML = newColumn[3];
        }
    }
  
    // add functions for rows and cols

    function addRow() {
        for (let i = 0; i < 15; i++) {
            if (gridArray[i].innerHTML === gridArray[i + 1].innerHTML) {
                let newVal = parseInt(gridArray[i].innerHTML) * 2;
                gridArray[i].innerHTML = newVal;
                gridArray[i + 1].innerHTML = 0;
                score += newVal;
                scoreDisplay.innerHTML = score;
            }
        }
        checkWin();
    }
  
    function addCol() {
        for (let i = 0; i < 12; i++) {
            if (gridArray[i].innerHTML === gridArray[i + 4].innerHTML) {
                let newVal = parseInt(gridArray[i].innerHTML) * 2;
                gridArray[i].innerHTML = newVal;
                gridArray[i + 4].innerHTML = 0;
                score += newVal;
                scoreDisplay.innerHTML = score;
            }
        }
      checkWin();
    }
  
    // assign key controls


    document.addEventListener("keydown", event => {
        if (event.isComposing || event.keyCode === 39 || event.keyCode === 68) {
          keyRight();
        }
    });

    document.addEventListener("keydown", event => {
        if (event.isComposing || event.keyCode === 37 || event.keyCode === 65) {
          keyLeft();
        }
    });

    document.addEventListener("keydown", event => {
        if (event.isComposing || event.keyCode === 38 || event.keyCode === 87) {
          keyUp();
        }
    });

    document.addEventListener("keydown", event => {
        if (event.isComposing || event.keyCode === 40 || event.keyCode === 83) {
            keyDown();
        }
    });
  
    function keyRight() {
        moveRight();
        addRow();
        moveRight();
        addNumber();
    }
  
    function keyLeft() {
        moveLeft();
        addRow();
        moveLeft();
        addNumber();
    }
  
    function keyUp() {
        moveUp();
        addCol();
        moveUp();
        addNumber();
    }
  
    function keyDown() {
        moveDown();
        addCol();
        moveDown();
        addNumber();
    }
  
    // check for win
    
    function checkWin() {
      for (let i=0; i < gridArray.length; i++) {
        if (gridArray[i].innerHTML == 2048) {
          resultDisplay.innerHTML = 'You reached 2048';
        }
      }
    }
  
    // check for loss

    function checkLoss() {
      //////////////
    }
  
  
    // add colors

    function addColors() {
      for (let i=0; i < gridArray.length; i++) {
        if (gridArray[i].innerHTML == 0) {
          gridArray[i].style.backgroundColor = '#CCC1B5';
          gridArray[i].style.color = 'transparent';
        }
        else if (gridArray[i].innerHTML == 2) {
          gridArray[i].style.backgroundColor = '#eee4da';
          gridArray[i].style.color = '#766E64';
        }
        else if (gridArray[i].innerHTML == 4) {gridArray[i].style.backgroundColor = '#ede0c8';gridArray[i].style.color = '#766E64';}
        else if (gridArray[i].innerHTML == 8) {gridArray[i].style.backgroundColor = '#f2b179';gridArray[i].style.color = 'white';}
        else if (gridArray[i].innerHTML == 16) {gridArray[i].style.backgroundColor = '#f59563';gridArray[i].style.color = 'white';}
        else if (gridArray[i].innerHTML == 32) {gridArray[i].style.backgroundColor = '#f67c5f';gridArray[i].style.color = 'white';}
        else if (gridArray[i].innerHTML == 64) {gridArray[i].style.backgroundColor = '#f65e3b';gridArray[i].style.color = 'white';}
        else if (gridArray[i].innerHTML == 128) {gridArray[i].style.backgroundColor = '#edcf72';gridArray[i].style.color = 'white';}
        else if (gridArray[i].innerHTML == 256) {gridArray[i].style.backgroundColor = '#edcc61';gridArray[i].style.color = 'white';}
        else if (gridArray[i].innerHTML == 512) {gridArray[i].style.backgroundColor = '#edc850';gridArray[i].style.color = 'white';}
        else if (gridArray[i].innerHTML == 1024) {gridArray[i].style.backgroundColor = '#edc53f';gridArray[i].style.color = 'white';}
        else if (gridArray[i].innerHTML == 2048) {gridArray[i].style.backgroundColor = '#edc22e';gridArray[i].style.color = 'white';}
      }
    }

  addColors();
  const colorTimer = setInterval(addColors, 5);  // refresh timer
  
})
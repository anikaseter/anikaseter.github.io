// Variables
let resetBtn = document.getElementById("resetButton");
let numBox = document.getElementById("numberBox");
let maze = document.getElementById("maze");
let mazeCells = document.getElementById("mazeCells");
let num0 = document.getElementById("0")
let num1 = document.getElementById("1")
let num2 = document.getElementById("2")
let num3 = document.getElementById("3")
let num4 = document.getElementById("4")
let num5 = document.getElementById("5")
let num6 = document.getElementById("6")
let num7 = document.getElementById("7")
let num8 = document.getElementById("8")
let num9 = document.getElementById("9")
let walledCells = [];
let circleButtons = [];



// Classes

// Walled cell - the ID of the cell, whether each wall is solid or not
class walledCell {
    constructor(cellID, rightWall, bottomWall) {
        this.cellID = cellID;
        this.walls = [rightWall, bottomWall];
    }
}

// Circle buttons
class circleButton {
    constructor(x, y, xVel, yVel, color, htmlObject) {
        this.x = x;
        this.y = y;
        this.xVel = xVel;
        this.yVel = yVel;
        this.color = color;
        this.htmlObject = htmlObject;
    }

    displayCircle() {
        switch(this.x) {
        case 0:
            this.htmlObject.style.left = '25px';
            break;
        case 1:
            this.htmlObject.style.left = '75px';
            break;
        case 2:
            this.htmlObject.style.left = '125px';
            break;
        }
    }
}



// Event Listeners
resetBtn.addEventListener('click', resetNumBox);



// Functions


// Grabbed from online - gets a random number
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}


// Upon initializing, randomizes where walls are
function initializeWalls() {
    let mazeText = '';

    // Randomize where walls are in each cell
    for(let i = 0; i < 100; i++) {
        // Randomize per wall if it's solid or not
        let walls = [];
        for(let j = 0; j < 2; j++) {
            let trueFalseNumber = getRandomIntInclusive(0, 2);
            if(trueFalseNumber == 0) {
                walls[j] = true;
            }
            else {
                walls[j] = false;
            }
            // console.log(walls[j]);
        }

        // Don't let the right/bottom wall exist if it's on the right/bottom of the maze
        if(i % 10 == 9) {
            walls[0] = false;
        }
        if(i >= 90) {
            walls[1] = false;
        }

        // Shove the new cell into the WalledCells array
        walledCells[i] = new walledCell(i, walls[0], walls[1]);
        // console.log(walls[1]);

        // Add the cell into the text that will go into the html
        mazeText += '<div class="cell'
        if(walledCells[i].walls[0] == true) {
            mazeText += ' rightWall';
        }
        if(walledCells[i].walls[1] == true) {
            mazeText += ' bottomWall';
        }
        mazeText += `" id="cell${i}"></div>`;
    }
    // Add the text into the html
    mazeCells.innerHTML = mazeText;
}

initializeWalls();


// Sets up the buttons in random positions
function initializeButtons() {
    for(let i=0; i < 10; i++) {
        circleButtons[i] = new circleButton(
            getRandomIntInclusive(0, 9),
            getRandomIntInclusive(0, 9),
            0,
            0,
            0,
            // `num${}`
        );
        circleButtons[i].displayCircle();
    }
}


// Empties number box
function resetNumBox() {
    numBox.textContent = '';
}
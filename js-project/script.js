// Variables
let resetBtn = document.getElementById("resetButton");
let numBox = document.getElementById("numberBox");
let walledCells = [];

// Classes

// Walled cell - the ID of the cell, whether each wall is solid or not
class walledCell {
    constructor(cellID, topWall, rightWall, bottomWall, leftWall) {
        this.cellID = cellID;
        this.walls = [topWall, rightWall, bottomWall, leftWall];
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

// Ensure a cell isn't already a Walled Cell
function checkIfWalled(cellID) {
    for(let j = 0; j < walledCells.length; j++) {
        if(cellID == walledCells[j].cellID) {
            return true;
        }
        return false;
    }
}

// Upon initializing, randomizes where walls are
/*  get ten random cells
    for each cell
        "flip a coin" for each wall to see if it becomes solid
        if yes, make that wall solid in the html/css/js
*/
function initializeWalls() {
    for(let i = 0; i < 10; i++) {
        // Get a random cell and make sure it's not already saved
        do {
            let currentCell = getRandomIntInclusive(0, 99);
        }
        while(checkIfWalled(currentCell));

        // Randomize per wall if it's solid or not; if the cell is on the top, right, bottom, or left, prevent that cell from getting the proper wall
        let walls = [];
        for(let j = 0; j < 4; j++) {
            let trueFalseNumber = getRandomIntInclusive(0, 2);
            if(trueFalseNumber == 0) {
                walls[j] = true;
            }
            else {
                walls[j] = false;
            }
        }

        // Shove the new cell into the WalledCells array

    }
}

// Empties number box
function resetNumBox() {
    numBox.textContent = '';
}
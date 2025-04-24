/*
    Notes to self:
    Something is wrong between initializing the walls of the cells and reading them;
    pretty sure it's to do with column-row mapping being off rip
*/


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
let numberButtons = [num0, num1, num2, num3, num4, num5, num6, num7, num8, num9];
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
    constructor(x, y, xVel, yVel, color, htmlObject, number) {
        this.x = x;
        this.y = y;
        this.xVel = xVel;
        this.yVel = yVel;
        this.color = color;
        this.htmlObject = htmlObject;
        this.number = number;
        this.htmlObject.addEventListener('click', this.clickNumber.bind(this));
        this.cell = findCell(this.x, this.y);
    }

    // Displays the buttons
    displayCircle() {
        // Change x and y and refind cell
        this.x = this.x + this.xVel;
        this.y = this.y + this.yVel;
        this.cell = findCell(this.x, this.y);

        // Change the x and y of the html object
        this.htmlObject.style.top = this.y + 'px';
        this.htmlObject.style.left = this.x + 'px';
    }

    // Enters numbers into the box upon clicking a button
    clickNumber() {
        numBox.textContent += this.number;
    }

    // Determine what its xVel and yVel should be
    // Whoops I think I'm making a rudimentary game AI
    determineVelocities() {
        let canMove = [true, true, true, true];
        // Check if the cell it's in has walls, and if so, rule out moving toward those walls
        // Check if it's by the right full wall, else check if there's a wall to its right
        if(this.cell[0] == 9) {
            canMove[0] = false;   
        }
        else if(walledCells[this.cell[0]][this.cell[1]].walls[0] == true) {
            canMove[0] = false;
        }
        // Check if it's by the bottom full wall, else check if there's a wall below it
        if(this.cell[1] == 9) {
            canMove[1] = false;
        }
        else if(walledCells[this.cell[0]][this.cell[1]].walls[1] == true) {
            canMove[1] = false;
        }
        // Check if it's by the left full wall, else check if there's a maze wall to its left
        if(this.cell[0] == 0) {
            canMove[2] = false;
        }
        else if(walledCells[this.cell[0] - 1][this.cell[1]].walls[0] == true) {
            canMove[2] = false;
        }
        // Check if it's by the top full wall, else check if there's a maze wall above it
        if(this.cell[1] == 0) {
            canMove[3] = false;
        }
        else if(walledCells[this.cell[0]][this.cell[1] - 1].walls[1] == true) {
            canMove[3] = false;
        }

        console.log(walledCells[this.cell[0]][this.cell[1]].walls);

        // If there's no option to move, cry
        // If there's only one option to move, go that way
        // If there's multiple, flip a coin and then decide
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

// Also from online - gets a random RGB value
function getRandomRgb() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// Upon initializing, randomizes where walls are
function initializeWalls() {
    let mazeText = '';

    // Randomize where walls are in each cell
    // Per column
    for(let i = 0; i < 10; i++) {
        // Each item in the column
        let column = [];
        for(let j = 0; j < 10; j++) {
            let walls = [];
            
            for(let k = 0; k < 2; k++) {
                let trueFalseNumber = getRandomIntInclusive(0, 2);
                if(trueFalseNumber == 0) {
                    walls[k] = true;
                }
                else {
                    walls[k] = false;
                }
            }
            
            // Don't let the right/bottom wall exist if it's on the right/bottom of the maze
            if(j == 9) {
                walls[0] = false;
            }
            if(i == 9) {
                walls[1] = false;
            }

            // Add the cell into the column
            column[j] = new walledCell(i * 10 + j, walls[0], walls[1]);

            // Add the cell into the text that will go into the html
            mazeText += '<div class="cell'
            if(column[j].walls[0] == true) {
                mazeText += ' rightWall';
            }
            if(column[j].walls[1] == true) {
                mazeText += ' bottomWall';
            }
            mazeText += `" id="cell${i * 10 + j}"></div>`;
        }

        walledCells[i] = column;
    }

    // Add the text into the html
    mazeCells.innerHTML = mazeText;

    // // Randomize where walls are in each cell
    // for(let i = 0; i < 100; i++) {
    //     // Randomize per wall if it's solid or not
    //     let walls = [];
    //     for(let j = 0; j < 2; j++) {
    //         let trueFalseNumber = getRandomIntInclusive(0, 2);
    //         if(trueFalseNumber == 0) {
    //             walls[j] = true;
    //         }
    //         else {
    //             walls[j] = false;
    //         }
    //         // console.log(walls[j]);
    //     }

    //     // Don't let the right/bottom wall exist if it's on the right/bottom of the maze
    //     if(i % 10 == 9) {
    //         walls[0] = false;
    //     }
    //     if(i >= 90) {
    //         walls[1] = false;
    //     }

    //     // Shove the new cell into the WalledCells array
    //     walledCells[i] = new walledCell(i, walls[0], walls[1]);
    //     // console.log(walls[1]);

    //     // Add the cell into the text that will go into the html
    //     mazeText += '<div class="cell'
    //     if(walledCells[i].walls[0] == true) {
    //         mazeText += ' rightWall';
    //     }
    //     if(walledCells[i].walls[1] == true) {
    //         mazeText += ' bottomWall';
    //     }
    //     mazeText += `" id="cell${i}"></div>`;
    // }
    // // Add the text into the html
    // mazeCells.innerHTML = mazeText;
}

initializeWalls();


// Gets a random x y position that's on an intersection of the board for starting position
function getRandomStartPos() {
    let randomX = getRandomIntInclusive(0, 9);
    let randomY = getRandomIntInclusive(0, 9);
    let coords = [0, 0];
    switch(randomX) {
        case 0:
            coords[0] = 10;
            break;
        case 1:
            coords[0] = 60;
            break;
        case 2:
            coords[0] = 110;
            break;
        case 3:
            coords[0] = 160;
            break;
        case 4:
            coords[0] = 210;
            break;
        case 5:
            coords[0] = 260;
            break;
        case 6:
            coords[0] = 310;
            break;
        case 7:
            coords[0] = 360;
            break;
        case 8:
            coords[0] = 410;
            break;
        case 9:
            coords[0] = 460;
            break;
    }
    switch(randomY) {
        case 0:
            coords[1] = 10;
            break;
        case 1:
            coords[1] = 60;
            break;
        case 2:
            coords[1] = 110;
            break;
        case 3:
            coords[1] = 160;
            break;
        case 4:
            coords[1] = 210;
            break;
        case 5:
            coords[1] = 260;
            break;
        case 6:
            coords[1] = 310;
            break;
        case 7:
            coords[1] = 360;
            break;
        case 8:
            coords[1] = 410;
            break;
        case 9:
            coords[1] = 460;
            break;
    }
    return coords;
}


// Sets up the buttons in random positions
function initializeButtons() {
    // Give them random positions and colors
    for(let i=0; i < 10; i++) {
        let randomXY = getRandomStartPos();
        circleButtons[i] = new circleButton(
            randomXY[0],
            randomXY[1],
            0,
            0,
            getRandomRgb(),
            numberButtons[i],
            i
        );
    // Set the colors and display them
    circleButtons[i].htmlObject.style.backgroundColor = circleButtons[i].color;
    circleButtons[i].displayCircle();
    }
}

initializeButtons();


// Empties number box
function resetNumBox() {
    numBox.textContent = '';
}


// Determines what cell a button is in based on XY coords; returns an array of [column, row]
function findCell(x, y) {
    let columnRow = [0, 0];
    // Find what column it's  in
    if(x < 35) {
        columnRow[0] = 0;
    }
    else if(x < 85) {
        columnRow[0] = 1;
    }
    else if(x < 135) {
        columnRow[0] = 2;
    }
    else if(x < 185) {
        columnRow[0] = 3;
    }
    else if(x < 235) {
        columnRow[0] = 4;
    }
    else if(x < 285) {
        columnRow[0] = 5;
    }
    else if(x < 335) {
        columnRow[0] = 6;
    }
    else if(x < 385) {
        columnRow[0] = 7;
    }
    else if(x < 435) {
        columnRow[0] = 8;
    }
    else {
        columnRow[0] = 9;
    }
    
    // Find what row it's in
    if(y < 35) {
        columnRow[1] = 0;
    }
    else if(y < 85) {
        columnRow[1] = 1;
    }
    else if(y < 135) {
        columnRow[1] = 2;
    }
    else if(y < 185) {
        columnRow[1] = 3;
    }
    else if(y < 235) {
        columnRow[1] = 4;
    }
    else if(y < 285) {
        columnRow[1] = 5;
    }
    else if(y < 335) {
        columnRow[1] = 6;
    }
    else if(y < 385) {
        columnRow[1] = 7;
    }
    else if(y < 435) {
        columnRow[1] = 8;
    }
    else {
        columnRow[1] = 9;
    }

    return columnRow;
}




// Testing
function test() {
    console.log(circleButtons[0].cell);
    circleButtons[0].determineVelocities();
}

test();

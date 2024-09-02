'use strict'

const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const CANDY = '🍭'


const gGame = {

    score: 0,
    isOn: false
}
var gBoard

function onInit() {
    console.log('hello')
    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)
    renderBoard(gBoard)
    
    gGame.isOn = true
    // getGhostHTML(ghost)

}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD

            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }
        }
    }
    board[1][8] = CANDY
    board[8][1] = CANDY
    board[1][1] = CANDY
    board[8][8] = CANDY
    return board
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            const cell = board[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    const elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
}

// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}


function updateScore(diff) {
    // update model 
    if (diff) {
        gGame.score += diff
    } else {
        gGame.score = 0
    }
    // and dom
    document.querySelector('span.score').innerText = gGame.score


}

function gameOver() {
    console.log('Game Over')
    clearInterval(gIntervalGhosts)
    renderCell(gPacman.location, '🪦')
    gGame.isOn = false
    onRestart()
}

function showGameOverModal() {
    const modal = document.querySelector('.Restart')
    modal.classList.remove('hidden')
}

function onRestart() {
    const modal = document.querySelector('.Restart')
    modal.classList.add('hidden')
    document.querySelector('.Restart').innerText = `play again!`
}

//* checking if collect all the food

function collectAllTheFood(location) {
    //  gBoard[location.i][location.j] = PACMAN

    if (checkVictory()) {
        gameOver(true)
        alert('victorious!')
    }

}

// //^ Goes through the entire matrix and
// // ^ checks if there is still food if one is game over
function checkVictory() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if (gBoard[i][j] === FOOD) {
                return false
            }
        }
    }
    return true
}




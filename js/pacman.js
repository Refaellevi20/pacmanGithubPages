

'use strict'

const CHERRY = '🍒'
const PACMAN = '😀'
var gPacman
var gEatenGhosts = []


var gCherryInterval = setInterval(addCherry, 15000)

function createPacman(board) {
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function onMovePacman(ev) {
    if (!gGame.isOn) return
    const nextLocation = getNextLocation(ev.code)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    if (nextCell === WALL) return
    if (nextCell === GHOST && !gPacman.isSuper) {
        gameOver()
        return
    } else if (nextCell === GHOST && gPacman.isSuper) {
        eatGhost(nextLocation)
    } else if (nextCell === FOOD) {
        updateScore(1)
        collectAllTheFood(gPacman.location)
    } else if (nextCell === CANDY) {
        if (!gPacman.isSuper) {
            activateSuperMode()
            setTimeout(deactivateSuperMode, 5000)
        }
    } else if (nextCell === CHERRY) {
        updateScore(10)
    }

    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    renderCell(gPacman.location, EMPTY)


    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    gPacman.location = nextLocation
    renderCell(nextLocation, PACMAN)
}

function eatGhost(nextLocation) {
    for (var i = 0; i < gGhosts.length; i++) {
        if (gGhosts[i].location.i === nextLocation.i && gGhosts[i].location.j === nextLocation.j) {
            if (gPacman.isSuper) {
                gEatenGhosts.push(gGhosts[i]) 
            }
            gGhosts.splice(i, 1) 
            break
        }
    }
}

function getNextLocation(eventKeyboard) {
    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard) {
        case 'ArrowUp':
            nextLocation.i--
            break
        case 'ArrowRight':
            nextLocation.j++
            break
        case 'ArrowDown':
            nextLocation.i++
            break
        case 'ArrowLeft':
            nextLocation.j--
            break
    }
    return nextLocation
}

function activateSuperMode() {
    gPacman.isSuper = true

}

function deactivateSuperMode() {
    gPacman.isSuper = false
    reviveEatenGhosts()

}

function reviveEatenGhosts() {
    while (gEatenGhosts.length > 0) {
        const ghost = gEatenGhosts.pop()
        ghost.location = { i: 2, j: 2 }
        gGhosts.push(ghost)
        renderCell(ghost.location, GHOST)
    }
}

function addCherry() {
    const emptyCells = getEmptyCells()
    if (emptyCells.length === 0) return
    const randIdx = Math.floor(Math.random() * emptyCells.length)
    const emptyCell = emptyCells[randIdx]
    gBoard[emptyCell.i][emptyCell.j] = CHERRY
    renderCell(emptyCell, CHERRY)
}

function getEmptyCells() {
    const emptyCells = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            const cell = gBoard[i][j]
            if (cell === EMPTY) {
                emptyCells.push({ i, j })
            }
        }
    }
    return emptyCells
}


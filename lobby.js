const express = require('express')
const router = express.Router()
const uuid = require('uuid')

const Game = require('./domain/game')
const Player = require('./domain/player')

const gameMap = new Map()

function checkBodyName(req) {
    if (!req.body.name) {
        throw new Error("name is undefined")
    }
}

router.post('/create', (req, res, next) => {

    console.log('Got body:', req.body);
    checkBodyName(req)

    const newID = uuid.v4()
    const newGame = new Game(newID)
    newGame.playerA = new Player(req.body.name)

    req.session.game = newGame
    gameMap.set(newID, newGame)

    res.json(newGame)
})

router.post('/join/:uuid', (req, res, next) => {

    console.log('Got body:', req.body);
    checkBodyName(req)

    const game = gameMap.get(req.params.uuid)
    
    if (!game) {
        throw new Error("game not found!")
    }
    if (game.playerB) {
        throw new Error("game is full!")
    }

    game.playerB = new Player(req.body.name)
    req.session.game = game

    res.json(game)
})

module.exports = router

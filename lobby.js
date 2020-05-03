const express = require('express')
const router = express.Router()
const Game = require('./domain/game')

const gameMap = new Map()

router.get('/:uuid', (req, res, next) => {

    const game = gameMap.get(req.params.uuid)
    if (!game) {
        throw new Error("not found!")
    }
    
    res.json(game)
})

router.post('/:uuid', (req, res, next) => {

    const game = new Game(req.params.uuid)
    gameMap.set(req.params.uuid, game);

    res.json(game)
})

module.exports = router

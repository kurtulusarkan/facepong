const express = require('express')
const morgan = require('morgan')
const path = require('path')

const lobby = require('./lobby')

const app = express()
const port = 3000

app.use('/public', express.static(path.join(__dirname, 'public')))
app.get('/', (req, res) => res.send('FacePong!'))
app.use('/lobby', lobby)

app.use(morgan('combined'))
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

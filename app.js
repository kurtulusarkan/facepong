const http = require('http')
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const path = require('path')

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(morgan('combined'))

// TODO: this needs more + https + a session storage etc!
const sessionParser = session({
    secret: 'secure key here!',
    resave: true,
    saveUninitialized: true,
    cookie: { 
        maxAge: 60000 
    }
})
app.use(sessionParser)

app.use('/public', express.static(path.join(__dirname, 'public')))
app.get('/', (req, res) => res.send('FacePong API is UP!'))

const lobby = require('./lobby')
app.use('/lobby', lobby)

const httpServer = http.createServer(app);

require('./webSocket')(httpServer, sessionParser)

httpServer.listen(port, function() {
    console.log('Listening on http://localhost:8080');
});

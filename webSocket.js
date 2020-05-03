const WebSocket = require('ws')

module.exports = function (httpServer, sessionParser) {

    const wsServer = new WebSocket.Server({
        path: "/ws",
        clientTracking: false,
        noServer: true
    });

    httpServer.on('upgrade', (request, socket, head) => {
        console.log('Upgrading to web socket connection!');
        sessionParser(request, {}, () => {
            if (!request.session.game) {
                console.error('Session not found!');
                socket.destroy();
                return;
            }
            wsServer.handleUpgrade(request, socket, head, function (ws) {
                wsServer.emit('connection', ws, request);
            });
        });
    })

    wsServer.on('connection', function (ws, request) {

        const game = request.session.game;

        ws.on('message', function (message) {
            console.log(`Received message from game ${game.uuid}`);
        });

        ws.on('close', function () {
            console.log(`Connection closed!`);
        });
    });
}

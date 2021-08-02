const WebSocket = require('ws');
const EventEmitter = require('events').EventEmitter;
const HashMap = require('hashmap');
const QueueHandler = require('./QueueHandler');
const axios = require('axios');

const port = 3102;

const config = require('../../config.json');
const wss = new WebSocket.Server({ port });
const eventListener = new EventEmitter();
const queues = new HashMap();

// Loading queues 
config['solo-queues'].map((queueConfig) => {
    let name = queueConfig.name;
    let minMatchSize = queueConfig.minAmount;
    let maxMatchSize = queueConfig.maxAmount;

    let queue = new QueueHandler(name, queueConfig.mapFinders, {
        minMatchSize,
        maxMatchSize,
        ranked: queueConfig.ranked
    }, eventListener);

    queues.set(name, queue);
    console.log('Loaded:', queueConfig);
});


// Websocket listeners
wss.on('listening', () => {
    console.log('[Snake Queue System] Server are ready at', port);
});

wss.on('connection', function connection(ws) {
    ws.on('error', console.error);
    console.log(`WS(${ws._socket.remoteAddress}) has connected`);
});

eventListener.on('onQueueAdd', (gameType, player) => {
    let queue = queues.get(gameType);
    if (queue !== undefined) {
        console.log('[Snake Queue System]', player, 'Added to queue', gameType);
        queue.addPlayer(player);
    } else {
        console.log('[Snake Queue System]', player, 'Error adding to queue', gameType);
    }
});

eventListener.on('onQueueRemove', (gameType, player) => {
    let queue = queues.get(gameType);
    if (queue !== undefined) {
        console.log('[Snake Queue System]', player, 'Removed from queue', gameType);
        queue.removePlayer(player);
    } else {
        console.log('[Snake Queue System]', player, 'Error removing from queue', gameType);
    }
});

eventListener.on('onQueueMatched', async (gameType, finder, players) => {
    /* console.log('[Snake Queue System]', gameType, 'matched with', players); */

    axios.get(`${process.env.GAMES_API_URL}${finder}`)
        .then(function (res) {
            console.log('Receiving:', res.data);
            let games = res.data;

            // Sort only when the length is greater than 1 :)
            if (games.length > 1) games.sort(sortGames);

            console.log('[Snake Queue System]', gameType, 'matched with', players, 'Arena:', games[0]);
            broadcast('onQueueMatched', { gameType, players, game: games[0] });
        })
        .catch(function (error) {
            console.log(error);
        });
});

// Broadcasting to all clients :D
async function broadcast(channel, data) {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: channel, data }));
        }
    });
}

// Sort games
function sortGames(a, b) {
    return a.players - b.players;
}

exports.pubsub = eventListener;
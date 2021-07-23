const Matchmaker = require('gamemaker');

class QueueHandler {

    constructor(gameType, options, pubsub) {
        this.gameType = gameType;
        this.options = options;
        this.matcher = new Matchmaker(startMatch, getPlayerID, {
            checkInterval: 1000,
            minMatchSize: options.minMatchSize,
            maxMatchSize: options.maxMatchSize,
            matchPlayersFunction: matchPlayers,
            sortQueueFunction: sortQueue,
        });

        function startMatch(players) {
            console.log('Sending players:', players.map(e => e.player));
            pubsub.emit('onQueueMatched', gameType, players);
        }

        function getPlayerID(player) {
            return player.uuid;
        }

        function matchPlayers(players) {
            if (this.options.ranked == false) {
                let player1 = players[0];
                let player2 = players[1];

                let elo = player1.elo - player2.elo;

                return elo >= -100 && elo <= 100;
            }

            return true;
        }

        function sortQueue(a, b) {
            //sort with the a and b player object
            return a - b;
        }

        this.matcher.init();
    }

    addPlayer(player) {
        this.matcher.addPlayer(player);
    }

    removePlayer(player) {
        this.matcher.removePlayerByID(player.uuid);
    }

}

module.exports = QueueHandler;
const redis = require('redis');
const client = redis.createClient({
    url: process.env.REDIS_URL,
});

const { pubsub } = require('../Events/EventListener');
const subscriber = client.duplicate();

client.on('error', (error) => {
    console.error(error);
});

client.on('reconnecting', () => {
    console.log('Reconnecting to Redis Database...');
});

client.on('ready', () => {
    console.log('Connected to Redis Database.');
});

subscriber.on('message', function (channel, message) {
    if (channel !== 'snakeapi-sync') return console.log('Error:', channel, message);
    let res = JSON.parse(message);

    // Returning if it's the same node
    if (res.node !== process.env.SERVER_NODE_NAME) return;

    if (res.type === 'dockerDie')
        pubsub.emit('onServerClose', 'none', res.data.server);

    if (res.type == 'onRedisServerCreate')
        pubsub.emit('onServerCreate', res.data, (promise) => {
            promise.then(data => console.log('Created', data)).catch(err => console.log('Error Creating:', err));
        });
});
subscriber.subscribe('snakeapi-sync');

module.exports = client;
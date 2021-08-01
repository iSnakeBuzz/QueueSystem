const redis = require('redis');
const client = redis.createClient({
    url: process.env.REDIS_URL,
});

client.on('error', (error) => {
    console.error(error);
});

client.on('reconnecting', () => {
    console.log('Reconnecting to Redis Database...');
});

client.on('ready', () => {
    console.log('Connected to Redis Database.');
});

module.exports = client;
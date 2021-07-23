const express = require('express');
const { pubsub } = require('../../Events/EventListener');

const router = express.Router();

/* GET home page. */
router.get('/', (_req, res) => {
    res.status(404).json({
        message: 'Correct path /queue/:gameType'
    });
});

/* GET by Database - insert uuid in the body :) */
router.post('/:gameType', (req, res) => {
    const { gameType } = req.params;
    const body = req.body;

    pubsub.emit('onQueueRemove', gameType, body);
    res.json({ error: false, message: 'Removed from the queue :(' });
});


module.exports = router;

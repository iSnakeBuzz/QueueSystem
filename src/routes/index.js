const express = require('express');
const router = express.Router();

router.get('/', function (_req, res) {
    res.json({
        title: 'QueueSystem',
        author: 'iSnakeBuzz_',
        version: '1.0.0',
        license: 'https://creativecommons.org/licenses/by-nc-nd/4.0/',
    });
});

module.exports = router;

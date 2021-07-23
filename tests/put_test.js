const loadtest = require('loadtest');
const { performance } = require('perf_hooks');

var t0 = performance.now();

loadtest.loadTest({
    url: 'http://localhost:3000/games/test',
    maxRequests: 500,
    method: 'PUT',
    contentType: 'application/json',
    body: {
        'uuid': 'test1',
        'hehe': 'ahsdhashad'
    }
}, function (error) {
    if (error) {
        return console.error('Got an error: %s', error);
    }
    var t1 = performance.now();

    console.log(`Server respond 1000 puts in ${Number(Number(t1 - t0) / 1000).toFixed(2)}s`);
});
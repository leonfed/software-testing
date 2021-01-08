var express = require('express');
var router = express.Router();

router.get('/ping', function (req, res, next) {
    res.send('pong');
});

router.get('/login', function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send('');
});

module.exports = router;

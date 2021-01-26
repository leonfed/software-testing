var express = require('express');
var router = express.Router();

class UserService {
    users = [{login: "sample_login", password: "Passw0rd", email: "sample_email@example.com", clicks: 0}];

    addUser(login, password, email) {
        this.users.push({login: login, password: password, email: email, clicks: 0});
    }

    checkPassword(login, password) {
        const found = this.users.find(user => user.login === login && user.password === password);
        return found !== undefined;
    }

    containLogin(login) {
        const found = this.users.find(user => user.login === login);
        return found !== undefined;
    }

    getClicks(login) {
        const found = this.users.find(user => user.login === login);
        return found.clicks;
    }

    incrementClicks(login) {
        const found = this.users.find(user => user.login === login);
        found.clicks++;
    }
}

const userService = new UserService();

router.get('/ping', function (req, res, next) {
    res.send('pong');
});

router.get('/login', function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");

    const login = req.query.login;
    const password = req.query.password;
    if (login && password && userService.checkPassword(login, password)) {
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
});

router.get('/signup', function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");

    const login = req.query.login;
    const password = req.query.password;
    const email = req.query.email;
    if (login && password && email) {
        if (userService.containLogin(login)) {
            res.sendStatus(403);
        } else {
            userService.addUser(login, password, email);
            res.sendStatus(200);
        }
    } else {
        res.sendStatus(406);
    }
});

router.get('/clicks', function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");

    const login = req.query.login;
    const password = req.query.password;
    if (login && password && userService.checkPassword(login, password)) {
        const isIncrement = req.query.increment;
        if (isIncrement === "true") {
            userService.incrementClicks(login);
        }
        const clicks = userService.getClicks(login);
        res.send({clicks: clicks});
    } else {
        res.sendStatus(401);
    }
});

module.exports = router;

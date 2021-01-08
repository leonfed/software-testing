var express = require('express');
var router = express.Router();

class UserService {
    users = [{login: "sample_login", password: "sample_password", email: "sample_email@example.com"}];

    addUser(user) {
        this.users.push(user);
    }

    checkPassword(login, password) {
        const found = this.users.find(user => user.login === login && user.password === password);
        return found !== undefined;
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

module.exports = router;

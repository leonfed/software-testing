package com.leonfed.server.controller;

import com.leonfed.server.model.Response;
import com.leonfed.server.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.logging.Logger;

@RestController
public class UserController {

    Logger log = Logger.getLogger(UserController.class.getName());

    private UserService userService;

    public UserController(UserService userDao) {
        this.userService = userDao;
    }

    @GetMapping(value = "/login", params = {"login", "password"})
    public ResponseEntity<?> login(@RequestParam("login") String login, @RequestParam("password") String password) {
        Response response = userService.checkCredentials(login, password);
        log.info("Request to login: " +
                "login = [" + login + "], " +
                "password = [" + password + "]. " +
                "Response: " + response.toString());
        return response.toResponseEntity();
    }

    @GetMapping(value = "/signup", params = {"login", "password", "email"})
    public ResponseEntity<?> signup(@RequestParam("login") String login,
                                    @RequestParam("password") String password,
                                    @RequestParam("email") String email) {
        Response response = userService.adduser(login, password, email);
        log.info("Request to signup: " +
                "login = [" + login + "], " +
                "password = [" + password + "], " +
                "email = [" + email + "]. " +
                "Response: " + response.toString());
        return response.toResponseEntity();
    }

    @GetMapping(value = "/clicks", params = {"login", "password", "increment"})
    @ResponseBody
    public ResponseEntity<?> click(@RequestParam("login") String login,
                                   @RequestParam("password") String password,
                                   @RequestParam("increment") String increment) {
        Response response = userService.click(login, password, "true".equals(increment));
        log.info("Request to click: " +
                "login = [" + login + "], " +
                "password = [" + password + "], " +
                "increment = [" + increment + "]. " +
                "Response: " + response.toString());
        return response.toResponseEntity();
    }
}

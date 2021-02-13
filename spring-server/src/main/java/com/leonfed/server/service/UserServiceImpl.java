package com.leonfed.server.service;

import com.leonfed.server.dao.UserDao;
import com.leonfed.server.model.Response;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.regex.Pattern;

@Service
public class UserServiceImpl implements UserService {
    UserDao userDao;

    public UserServiceImpl(UserDao userDao) {
        this.userDao = userDao;
    }

    static boolean checkLogin(String login) {
        return Pattern.matches("^[A-Za-z0-9_]{3,}$", login);
    }

    static boolean checkPassword(String password) {
        return password.length() >= 5 &&
                Pattern.matches(".*[A-Z]+.*", password) &&
                Pattern.matches(".*[a-z]+.*", password) &&
                Pattern.matches(".*[0-9]+.*", password);
    }

    static boolean checkEmail(String email) {
        return !email.isEmpty();
    }

    @Override
    public Response checkCredentials(String login, String password) {
        boolean checked = userDao.checkCredentials(login, password);

        if (checked) {
            return new Response(HttpStatus.OK);
        } else {
            return new Response(HttpStatus.UNAUTHORIZED);
        }
    }

    @Override
    public Response adduser(String login, String password, String email) {
        boolean valid = checkLogin(login) && checkPassword(password) && checkEmail(email);

        if (!valid) {
            return new Response(HttpStatus.NOT_ACCEPTABLE);
        }

        boolean added = userDao.adduser(login, password, email);

        if (added) {
            return new Response(HttpStatus.OK);
        } else {
            return new Response(HttpStatus.FORBIDDEN);
        }
    }

    @Override
    public Response click(String login, String password, boolean increment) {
        if (increment) {
            boolean incremented = userDao.incrementClicks(login, password);
            if (!incremented) {
                return new Response(HttpStatus.UNAUTHORIZED);
            }
        }

        Optional<Integer> clicksOpt = userDao.getClicks(login, password);

        Optional<Response> response = clicksOpt.map(clicks -> {
            JSONObject jsonObject = new JSONObject();
            try {
                jsonObject.put("clicks", clicks);
            } catch (JSONException e) {
                e.printStackTrace();
                return new Response(HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return new Response(HttpStatus.OK, jsonObject);
        });

        return response.orElseGet(() -> new Response(HttpStatus.UNAUTHORIZED));
    }
}

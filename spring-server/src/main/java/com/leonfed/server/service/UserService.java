package com.leonfed.server.service;

import com.leonfed.server.model.Response;

public interface UserService {
    Response checkCredentials(String login, String password);

    Response adduser(String login, String password, String email);

    Response click(String login, String password, boolean increment);
}

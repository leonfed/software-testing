package com.leonfed.server.dao;

import java.util.Optional;

public interface UserDao {
    boolean checkCredentials(String login, String password);

    /**
     * @return true if user is added, false otherwise
     */
    boolean adduser(String login, String password, String email);

    /**
     * @return value if credentials are correct, nothing otherwise
     */
    Optional<Integer> getClicks(String login, String password);

    boolean incrementClicks(String login, String password);

    void clean();
}

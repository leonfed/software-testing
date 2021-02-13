package com.leonfed.server.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.support.JdbcDaoSupport;

import javax.sql.DataSource;
import java.util.List;
import java.util.Optional;

public class JdbcUserDao extends JdbcDaoSupport implements UserDao {

    private final JdbcTemplate jdbcTemplate;

    public JdbcUserDao(DataSource dataSource) {
        super();
        setDataSource(dataSource);
        this.jdbcTemplate = getJdbcTemplate();
    }

    public void createTable() {
        String createQuery = "CREATE TABLE users (" +
                "login VARCHAR(255) NOT NULL," +
                "password VARCHAR(255) NOT NULL," +
                "email VARCHAR(255) NOT NULL," +
                "clicks INTEGER NOT NULL," +
                "PRIMARY KEY users_login_pk (login)" +
                ");";
        jdbcTemplate.execute(createQuery);
    }

    @Override
    public boolean checkCredentials(String login, String password) {
        String sql = "SELECT EXISTS(SELECT * FROM users " +
                "WHERE login = '" + login + "' " +
                "AND password = '" + password + "'" +
                ");";
        return jdbcTemplate.queryForObject(sql, Boolean.class);
    }

    @Override
    public boolean adduser(String login, String password, String email) {
        String sql = "INSERT IGNORE INTO users (login, password, email, clicks) VALUES (" +
                "'" + login + "', " +
                "'" + password + "', " +
                "'" + email + "', " +
                "0" +
                ");";
        int result = jdbcTemplate.update(sql);
        return result != 0;
    }

    @Override
    public Optional<Integer> getClicks(String login, String password) {
        String sql = "SELECT clicks FROM users " +
                "WHERE login = '" + login + "' " +
                "AND password = '" + password + "'" +
                "LIMIT 1;";
        List<Integer> clicks = jdbcTemplate.queryForList(sql, Integer.class);
        return clicks.stream().findFirst();
    }

    @Override
    public boolean incrementClicks(String login, String password) {
        String sql = "UPDATE users " +
                "SET clicks = clicks + 1 " +
                "WHERE login = '" + login + "' " +
                "AND password = '" + password + "';";
        int result = jdbcTemplate.update(sql);
        return result != 0;
    }

    @Override
    public void clean() {
        String sql = "DELETE FROM users WHERE 1 = 1";
        jdbcTemplate.update(sql);
    }


}

package com.leonfed.server.dao;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.testcontainers.containers.MySQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.utility.DockerImageName;

import static org.assertj.core.api.Assertions.assertThat;

@Testcontainers
public class JdbcUserDaoTest {

    @Container
    public static MySQLContainer<?> mysql = new MySQLContainer<>(DockerImageName.parse("mysql:5.6"));

    public static JdbcUserDao userDao;

    static final String DEFAULT_LOGIN = "some_login";
    static final String DEFAULT_PASSWORD = "qwer_1234_QWER";
    static final String DEFAULT_EMAIL = "abc@example.com";

    @BeforeAll
    public static void initDao() {
        final DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName(mysql.getDriverClassName());
        dataSource.setUrl(mysql.getJdbcUrl());
        dataSource.setUsername(mysql.getUsername());
        dataSource.setPassword(mysql.getPassword());
        userDao = new JdbcUserDao(dataSource);
        userDao.createTable();
    }

    @BeforeEach
    public void clean() {
        userDao.clean();
    }

    @Test
    public void addUser() {
        assertThat(userDao.checkCredentials(DEFAULT_LOGIN, DEFAULT_PASSWORD)).isFalse();
        userDao.adduser(DEFAULT_LOGIN, DEFAULT_PASSWORD, DEFAULT_EMAIL);
        assertThat(userDao.checkCredentials(DEFAULT_LOGIN, DEFAULT_PASSWORD)).isTrue();
    }

    @Test
    public void addUserTwice() {
        assertThat(userDao.adduser(DEFAULT_LOGIN, DEFAULT_PASSWORD, DEFAULT_EMAIL)).isTrue();
        assertThat(userDao.adduser(DEFAULT_LOGIN, DEFAULT_PASSWORD, DEFAULT_EMAIL)).isFalse();
    }

    @Test
    public void checkWithIncorrectCredentials() {
        userDao.adduser(DEFAULT_LOGIN, DEFAULT_PASSWORD, DEFAULT_EMAIL);
        assertThat(userDao.checkCredentials(DEFAULT_LOGIN, "Another_Passw0rd")).isFalse();
    }

    @Test
    public void getClicksWithIncorrectCredentials() {
        userDao.adduser(DEFAULT_LOGIN, DEFAULT_PASSWORD, DEFAULT_EMAIL);
        assertThat(userDao.getClicks(DEFAULT_LOGIN, "Another_Passw0rd")).isEmpty();
    }

    @Test
    public void incrementClicks() {
        userDao.adduser(DEFAULT_LOGIN, DEFAULT_PASSWORD, DEFAULT_EMAIL);
        assertThat(userDao.getClicks(DEFAULT_LOGIN, DEFAULT_PASSWORD)).contains(0);

        userDao.incrementClicks(DEFAULT_LOGIN, DEFAULT_PASSWORD);
        userDao.incrementClicks(DEFAULT_LOGIN, DEFAULT_PASSWORD);

        assertThat(userDao.getClicks(DEFAULT_LOGIN, DEFAULT_PASSWORD)).contains(2);
    }

    @Test
    public void getClick() {
        userDao.adduser(DEFAULT_LOGIN, DEFAULT_PASSWORD, DEFAULT_EMAIL);
        assertThat(userDao.getClicks(DEFAULT_LOGIN, "Another_Passw0rd")).isEmpty();
    }

}
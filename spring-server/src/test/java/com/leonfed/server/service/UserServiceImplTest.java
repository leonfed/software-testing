package com.leonfed.server.service;

import com.leonfed.server.dao.UserDao;
import com.leonfed.server.model.Response;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class UserServiceImplTest {

    UserDao userDao = mock(UserDao.class);
    public UserService userService;

    static final String DEFAULT_LOGIN = "some_login";
    static final String DEFAULT_PASSWORD = "qwer_1234_QWER";
    static final String DEFAULT_EMAIL = "abc@example.com";

    @BeforeEach
    public void initService() {
        userService = new UserServiceImpl(userDao);
    }

    @Test
    public void checkExistedCredentials() {
        when(userDao.checkCredentials(any(), any())).thenReturn(true);
        Response actualResponse = userService.checkCredentials(DEFAULT_LOGIN, DEFAULT_PASSWORD);
        assertThat(actualResponse).isEqualTo(new Response(HttpStatus.OK));
    }

    @Test
    public void checkNotExistedCredentials() {
        when(userDao.checkCredentials(any(), any())).thenReturn(false);
        Response actualResponse = userService.checkCredentials(DEFAULT_LOGIN, DEFAULT_PASSWORD);
        assertThat(actualResponse).isEqualTo(new Response(HttpStatus.UNAUTHORIZED));
    }

    @Test
    public void addNewUser() {
        when(userDao.adduser(any(), any(), any())).thenReturn(true);
        Response actualResponse = userService.adduser(DEFAULT_LOGIN, DEFAULT_PASSWORD, DEFAULT_EMAIL);
        assertThat(actualResponse).isEqualTo(new Response(HttpStatus.OK));
    }

    @Test
    public void addUserWithIncorrectData() {
        Response actualResponse = userService.adduser("", "", "");
        assertThat(actualResponse).isEqualTo(new Response(HttpStatus.NOT_ACCEPTABLE));
    }

    @Test
    public void clickWithFailedIncrement() {
        when(userDao.incrementClicks(any(), any())).thenReturn(false);
        Response actualResponse = userService.click(DEFAULT_LOGIN, DEFAULT_PASSWORD, true);
        assertThat(actualResponse).isEqualTo(new Response(HttpStatus.UNAUTHORIZED));
    }

    @Test
    public void clickWithNotCorrectCredentials() {
        when(userDao.getClicks(any(), any())).thenReturn(Optional.empty());
        Response actualResponse = userService.click(DEFAULT_LOGIN, DEFAULT_PASSWORD, false);
        assertThat(actualResponse).isEqualTo(new Response(HttpStatus.UNAUTHORIZED));
    }

    @Test
    public void click() throws JSONException {
        int clicks = 10;
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("clicks", clicks);

        when(userDao.getClicks(any(), any())).thenReturn(Optional.of(clicks));
        Response actualResponse = userService.click(DEFAULT_LOGIN, DEFAULT_PASSWORD, false);

        assertThat(actualResponse).isEqualTo(new Response(HttpStatus.OK, jsonObject));
    }
}

package com.leonfed.server.conroller;

import com.leonfed.server.controller.UserController;
import com.leonfed.server.model.Response;
import com.leonfed.server.service.UserService;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.anyBoolean;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(UserController.class)
public class UserControllerTest {
    @MockBean
    private UserService userService;
    @Autowired
    private MockMvc mockMvc;

    @Test
    public void successLogin() throws Exception {
        given(userService.checkCredentials(any(), any())).willReturn(new Response(HttpStatus.OK));
        mockMvc.perform(get("/login?login=qwerty&password=Qw123456")).andExpect(status().isOk());
    }

    @Test
    public void failedLogin() throws Exception {
        given(userService.checkCredentials(any(), any())).willReturn(new Response(HttpStatus.UNAUTHORIZED));
        mockMvc.perform(get("/login?login=qwerty&password=Qw123456")).andExpect(status().isUnauthorized());
    }

    @Test
    public void successSignup() throws Exception {
        given(userService.adduser(any(), any(), any())).willReturn(new Response(HttpStatus.OK));
        mockMvc.perform(get("/signup?login=qwerty&password=Qw123456&email=abc")).andExpect(status().isOk());
    }

    @Test
    public void successClick() throws Exception {
        int clicks = 10;
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("clicks", clicks);

        given(userService.click(any(), any(), anyBoolean())).willReturn(new Response(HttpStatus.OK, jsonObject));
        mockMvc.perform(get("/clicks?login=qwerty&password=Qw123456&increment=false"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.clicks", is(clicks)));
    }
}
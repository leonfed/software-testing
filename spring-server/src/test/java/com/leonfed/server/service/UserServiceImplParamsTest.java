package com.leonfed.server.service;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class UserServiceImplParamsTest {

    @Test
    void correctLogin() {
        assertThat(UserServiceImpl.checkLogin("ABHYZ_aswpz_0379")).isTrue();
    }

    @Test
    void shortLogin() {
        assertThat(UserServiceImpl.checkLogin("ab")).isFalse();
    }

    @Test
    void notSuitableLogin() {
        assertThat(UserServiceImpl.checkLogin("abc#abc")).isFalse();
    }

    @Test
    void correctPassword() {
        assertThat(UserServiceImpl.checkPassword("ABHYZ_aswpz_0379_$%-@#")).isTrue();
    }

    @Test
    void shortPassword() {
        assertThat(UserServiceImpl.checkPassword("aB7#")).isFalse();
    }

    @Test
    void noBigLettersPassword() {
        assertThat(UserServiceImpl.checkPassword("aswpz_0379_$%-@#")).isFalse();
    }

    @Test
    void noSmallLettersPassword() {
        assertThat(UserServiceImpl.checkPassword("ABHYZ_0379_$%-@#")).isFalse();
    }

    @Test
    void noNumbersPassword() {
        assertThat(UserServiceImpl.checkPassword("ABHYZ_aswpz_$%-@#")).isFalse();
    }

    @Test
    void correctEmail() {
        assertThat(UserServiceImpl.checkEmail("abc@example.ru")).isTrue();
    }

    @Test
    void emptyEmail() {;
        assertThat(UserServiceImpl.checkEmail("")).isFalse();
    }

}

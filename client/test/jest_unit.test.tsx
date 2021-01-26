import React from 'react';
import {ClickResponseErrors, getClickResponseError} from "../src/components/Clicker";
import {getLoginResponseError, LoginResponseErrors} from "../src/components/Login";
import {checkLogin, checkPassword, getSignupResponseError, SignupResponseErrors} from "../src/components/Signup";

describe('get click response error', () => {
    it('handle code 401', async () => {
        expect(getClickResponseError(401)).toBe(ClickResponseErrors.Authorization)
    });
    it('handle code 504', async () => {
        expect(getClickResponseError(504)).toBe(ClickResponseErrors.Request)
    });
});

describe('get signup response error', () => {
    it('handle code 403', async () => {
        expect(getSignupResponseError(403)).toBe(SignupResponseErrors.LoginUsed)
    });
    it('handle code 406', async () => {
        expect(getSignupResponseError(406)).toBe(SignupResponseErrors.NotAcceptableInput)
    });
    it('handle code 504', async () => {
        expect(getSignupResponseError(504)).toBe(SignupResponseErrors.Request)
    });
});

describe('get login response error', () => {
    it('handle code 401', async () => {
        expect(getLoginResponseError(401)).toBe(LoginResponseErrors.IncorrectData)
    });
    it('handle code 504', async () => {
        expect(getLoginResponseError(504)).toBe(LoginResponseErrors.Request)
    });
});

describe('check login', () => {
    it('correct login', async () => {
        expect(checkLogin('ABHYZ_aswpz_0379')).toBe(true)
    });
    it('short login', async () => {
        expect(checkLogin('ab')).toBe(false)
    });
    it('login with not suitable symbol', async () => {
        expect(checkLogin('abc#abc')).toBe(false)
    });
});

describe('check password', () => {
    it('correct password', async () => {
        expect(checkPassword('ABHYZ_aswpz_0379_$%-@#')).toBe(true)
    });
    it('short password', async () => {
        expect(checkPassword('aB7#')).toBe(false)
    });
    it('password without big letters', async () => {
        expect(checkPassword('aswpz_0379_$%-@#')).toBe(false)
    });
    it('password without small letters', async () => {
        expect(checkPassword('ABHYZ_0379_$%-@#')).toBe(false)
    });
    it('password without numbers', async () => {
        expect(checkPassword('ABHYZ_aswpz_$%-@#')).toBe(false)
    });
});

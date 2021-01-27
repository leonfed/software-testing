import React from 'react';

import {HOME_MESSAGE} from "../src/components/Home";
import {ERROR_PAGE_MESSAGE} from "../src/components/ErrorPage";
import {LoginResponseErrors} from "../src/components/Login";
import {INCORRECT_LOGIN_ERROR, INCORRECT_PASSWORD_ERROR} from "../src/components/Signup";
import {randomString} from "../src/utils/Random";

const playwright = require('playwright');

const HOME_URL = 'http://localhost:3000';

async function sleep(ms: number) {
    await new Promise((resolve) => setTimeout(resolve, ms));
}

describe(`playwright e2e without authorization`, () => {

    let browser: any = null;
    let page: any = null;

    beforeAll(async () => {
        browser = await playwright['chromium'].launch();
    });

    beforeEach(async () => {
        page = await browser.newPage();
        await page.goto(HOME_URL);
    });

    afterAll(async () => {
        await browser.close();
    });

    it(`home page`, async () => {
        expect(await page.innerText('#home__message')).toBe(HOME_MESSAGE);
    });

    it(`not found page`, async () => {
        await page.goto(HOME_URL + '/unknown_page');

        expect(await page.innerText('#not_found_page__message')).toBe(ERROR_PAGE_MESSAGE);
    });

    it(`incorrect login`, async () => {
        const login = 'login';
        const password = 'Passw0rd';

        await page.goto(HOME_URL + '/login');
        await page.fill('#login_form__login', login);
        await page.fill('#login_form__password', password);
        await page.click('#login_form__submit');

        expect(await page.$('#login_form')).not.toBeNull();
        expect(await page.innerText('#error__message')).toBe(LoginResponseErrors.IncorrectData);
    });

    async function tryToSignup(login: String, password: String, email: String) {
        await page.goto(HOME_URL + '/signup');
        await page.fill('#signup_form__login', login);
        await page.fill('#signup_form__password', password);
        await page.fill('#signup_form__email', email);
        await page.click('#signup_form__submit');
    }

    it(`signup with not acceptable login`, async () => {
        await tryToSignup('login###', 'Passw0rd', 'aaa@bbb.ru');

        expect(await page.$('#signup_form')).not.toBeNull();
        expect(await page.innerText('#error__message')).toBe(INCORRECT_LOGIN_ERROR);
    });

    it(`signup with not acceptable password`, async () => {
        await tryToSignup('login', 'password', 'aaa@bbb.ru');

        expect(await page.$('#signup_form')).not.toBeNull();
        expect(await page.innerText('#error__message')).toBe(INCORRECT_PASSWORD_ERROR);
    });
});

describe(`playwright e2e with authorization`, () => {

    let browser: any = null;
    let page: any = null;

    let login = randomString();
    const password = 'Passw0rd';
    const email = randomString() + '@' + randomString() + '.com';

    async function doLogin() {
        await page.goto(HOME_URL + '/login');
        await page.fill('#login_form__login', login);
        await page.fill('#login_form__password', password);
        await page.click('#login_form__submit');
        await sleep(200);
    }

    async function doLogout() {
        await page.goto(HOME_URL + '/logout');
        await page.click('#logout__submit');
        await sleep(200);
    }

    beforeAll(async () => {
        browser = await playwright['firefox'].launch();
        page = await browser.newPage();

        await page.goto(HOME_URL + '/signup');
        await page.fill('#signup_form__login', login);
        await page.fill('#signup_form__password', password);
        await page.fill('#signup_form__email', email);
        await page.click('#signup_form__submit');
    });

    beforeEach(async () => {
        page = await browser.newPage();
        await doLogin();
        await page.goto(HOME_URL);
    });

    afterAll(async () => {
        await browser.close();
    });

    async function getClicks() {
        await page.goto(HOME_URL + '/clicker');
        await sleep(300);

        expect(await page.$('#clicker__text')).not.toBeNull();
        return page.innerText('#clicker__text');
    }

    it(`click to increase count`, async () => {
        const clicks = Number(await getClicks());
        await page.click('#clicker__button');
        const newClicks = Number(await getClicks());
        expect(newClicks - 1).toBe(clicks)
    });

    it(`logout and login`, async () => {
        const clicks = Number(await getClicks());

        await doLogout();
        await doLogin();

        const newClicks = Number(await getClicks());
        expect(newClicks).toBe(clicks)
    });
});

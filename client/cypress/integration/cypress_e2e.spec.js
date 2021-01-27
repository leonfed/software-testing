import {HOME_MESSAGE} from "../../src/components/Home";
import {ERROR_PAGE_MESSAGE} from "../../src/components/ErrorPage";
import {LoginResponseErrors} from "../../src/components/Login";
import {INCORRECT_LOGIN_ERROR, INCORRECT_PASSWORD_ERROR} from "../../src/components/Signup";
import {randomString} from "../../src/utils/Random";

const HOME_URL = 'http://localhost:3000';

describe('cypress e2e without authorization', () => {

    it('home page', () => {
        cy.visit(HOME_URL);
        cy.get('#home__message').should('contain', HOME_MESSAGE)
    });

    it(`not found page`, async () => {
        cy.visit(HOME_URL + '/unknown_page');
        cy.get('#not_found_page__message').should('contain', ERROR_PAGE_MESSAGE);
    });

    it(`incorrect login`, async () => {
        cy.visit(HOME_URL + '/login');
        cy.get('#login_form__login').type('login');
        cy.get('#login_form__password').type('Passw0rd');
        cy.get('#login_form__submit').click();

        cy.get('#login_form').should('be.visible');
        cy.get('#error__message').should('contain', LoginResponseErrors.IncorrectData);
    });

    function tryToSignup(login, password, email) {
        cy.visit(HOME_URL + '/signup');
        cy.get('#signup_form__login').type(login);
        cy.get('#signup_form__password').type(password);
        cy.get('#signup_form__email').type(email);
        cy.get('#signup_form__submit').click();
    }

    it(`signup with not acceptable login`, async () => {
        tryToSignup('login###', 'Passw0rd', 'aaa@bbb.ru');

        cy.get('#signup_form').should('be.visible');
        cy.get('#error__message').should('contain', INCORRECT_LOGIN_ERROR);
    });

    it(`signup with not acceptable password`, async () => {
        tryToSignup('login', 'password', 'aaa@bbb.ru');

        cy.get('#signup_form').should('be.visible');
        cy.get('#error__message').should('contain', INCORRECT_PASSWORD_ERROR);
    });
});


describe('cypress e2e with authorization', () => {

    let login = randomString();
    const password = 'Passw0rd';
    const email = randomString() + '@' + randomString() + '.com';

    before(() => {
        cy.visit(HOME_URL + '/signup');
        cy.get('#signup_form__login').type(login);
        cy.get('#signup_form__password').type(password);
        cy.get('#signup_form__email').type(email);
        cy.get('#signup_form__submit').click();
        cy.wait(200);
    });

    function doLogin() {
        cy.visit(HOME_URL + '/login');
        cy.get('#login_form__login').type(login);
        cy.get('#login_form__password').type(password);
        cy.get('#login_form__submit').click();
        cy.wait(200);
    }

    function doLogout() {
        cy.visit(HOME_URL + '/logout');
        cy.get('#logout__submit').click();
        cy.wait(200);
    }

    function getClickElement() {
        cy.visit(HOME_URL + '/clicker');
        cy.wait(300);
        cy.get('#clicker__text').should('be.visible');
        return cy.get('#clicker__text').invoke('text');
    }

    it('click to increase count', () => {
        cy.visit(HOME_URL);
        getClickElement().should($clicks => {
            expect($clicks).to.eql('0');
        });

        cy.get('#clicker__button').click();

        getClickElement().should($clicks => {
            expect($clicks).to.eql('1');
        });

        doLogout();
        doLogin();

        getClickElement().should($clicks => {
            expect($clicks).to.eql('1');
        });
    });
});

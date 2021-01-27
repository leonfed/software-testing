import {HOME_MESSAGE} from "../../src/components/Home";
import {ERROR_PAGE_MESSAGE} from "../../src/components/ErrorPage";
import {LoginResponseErrors} from "../../src/components/Login";
import {INCORRECT_LOGIN_ERROR, INCORRECT_PASSWORD_ERROR} from "../../src/components/Signup";

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

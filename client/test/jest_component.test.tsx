import React from "react";

import {Home, HOME_MESSAGE} from "../src/components/Home";
import {ERROR_PAGE_MESSAGE, ErrorPage} from "../src/components/ErrorPage";
import Logout, {LOGOUT_MESSAGE} from "../src/components/Logout";
import ErrorMessage from "../src/components/ErrorMessage";
import NavigationHeader from "../src/components/NavigationHeader";
import {Router} from "react-router-dom";
import {createMemoryHistory} from 'history';
import {Clicker} from "../src/components/Clicker";
import Login from "../src/components/Login";
import Signup from "../src/components/Signup";

const TestRenderer = require('react-test-renderer');

describe('home page', () => {
    it('render home message', () => {
        const componentRenderer = TestRenderer.create(<Home/>);
        expect(componentRenderer.root.findByType('p').props.children).toEqual(HOME_MESSAGE);
    });
});

describe('error page', () => {
    it('render error page message', () => {
        const componentRenderer = TestRenderer.create(<ErrorPage/>);
        expect(componentRenderer.root.findByType('p').props.children).toEqual(ERROR_PAGE_MESSAGE);
    });
});

describe('logout page', () => {
    it('render logout message', () => {
        const componentRenderer = TestRenderer.create(<Logout/>);
        expect(componentRenderer.root.findByType('p').props.children).toEqual(LOGOUT_MESSAGE);
    });
    it('render logout button', () => {
        const componentRenderer = TestRenderer.create(<Logout/>);
        expect(componentRenderer.root.findByType('button').props.children).toEqual('Log out');
    });
});

describe('error message page', () => {
    it('render error message', () => {
        const message = 'some message';
        const componentRenderer = TestRenderer.create(<ErrorMessage text={message}/>);
        expect(componentRenderer.root.findByType('div').props.children.props.children).toEqual(message);
    });
});

describe('navigation header', () => {
    it('render links without log in', () => {
        const history = createMemoryHistory();
        const componentRenderer = TestRenderer.create(
            <Router history={history}>
                <NavigationHeader isLoggedIn={() => false}/>
            </Router>
        );

        const navigationsLinks = componentRenderer.root.findByType('div').props.children;

        expect(navigationsLinks.length).toBe(5);

        const homeLink = navigationsLinks[0];
        expect(homeLink.props.children).toEqual('Home');
        expect(homeLink.props.to).toEqual('/');

        const loginLink = navigationsLinks[1];
        expect(loginLink.props.children).toEqual('Log In');
        expect(loginLink.props.to).toEqual('/login');

        const signupLink = navigationsLinks[2];
        expect(signupLink.props.children).toEqual('Sign Up');
        expect(signupLink.props.to).toEqual('/signup');

        expect(navigationsLinks[3]).toBe(false);
        expect(navigationsLinks[4]).toBe(false);
    });

    it('render links with log in', () => {
        const history = createMemoryHistory();
        const componentRenderer = TestRenderer.create(
            <Router history={history}>
                <NavigationHeader isLoggedIn={() => true}/>
            </Router>
        );

        const navigationsLinks = componentRenderer.root.findByType('div').props.children;

        expect(navigationsLinks.length).toBe(5);

        const homeLink = navigationsLinks[0];
        expect(homeLink.props.children).toEqual('Home');
        expect(homeLink.props.to).toEqual('/');

        expect(navigationsLinks[1]).toBe(false);
        expect(navigationsLinks[2]).toBe(false);

        const loginLink = navigationsLinks[3];
        expect(loginLink.props.children).toEqual('Clicker');
        expect(loginLink.props.to).toEqual('/clicker');

        const signupLink = navigationsLinks[4];
        expect(signupLink.props.children).toEqual('Log Out');
        expect(signupLink.props.to).toEqual('/logout');
    });
});

describe('clicker page', () => {
    it('render clicker button', () => {
        const componentRenderer = TestRenderer.create(<Clicker errorFunction={(s: String) => s}/>);
        expect(componentRenderer.root.findByType('div').props.children[1].props.children).toEqual('Click');
    });
    it('unknown clicker text', () => {
        const componentRenderer = TestRenderer.create(
            <Clicker errorFunction={(s: String) => s} currentClicks={undefined}/>
        );
        expect(componentRenderer.root.findByType('div').props.children[0].props.children).toEqual('unknown');
    });
    it('clicks numbers', () => {
        const clicks = Math.floor(Math.random() * 100 + 1);
        const componentRenderer = TestRenderer.create(
            <Clicker errorFunction={(s: String) => s} currentClicks={clicks}/>
        );
        expect(componentRenderer.root.findByType('div').props.children[0].props.children).toEqual(clicks);
    });
});

describe('login page', () => {
    it('render input labels', () => {
        const componentRenderer = TestRenderer.create(<Login/>);
        const formsChildren = componentRenderer.root.findByType('form').props.children;
        expect(formsChildren[0].props.children[0].props.children).toEqual('Login');
        expect(formsChildren[1].props.children[0].props.children).toEqual('Password');
        expect(formsChildren[2].props.children).toEqual('Log In');
    });
});

describe('signup page', () => {
    it('render input labels', () => {
        const componentRenderer = TestRenderer.create(<Signup/>);
        const formsChildren = componentRenderer.root.findByType('form').props.children;
        expect(formsChildren[0].props.children[0].props.children).toEqual('Login');
        expect(formsChildren[1].props.children[0].props.children).toEqual('Password');
        expect(formsChildren[2].props.children[0].props.children).toEqual('Email');
        expect(formsChildren[3].props.children).toEqual('Sign Up');
    });
});

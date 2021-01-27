import React from 'react';
import {NavLink} from "react-router-dom";

const loginNavLinks = () => {
    return <NavLink className="NavigationLink" to="/login" id='login_link'>Log In</NavLink>;
};

const signupNavLinks = () => {
    return <NavLink className="NavigationLink" to="/signup" id='signup_link'>Sign Up</NavLink>;
};

const logoutNavLinks = () => {
    return <NavLink className="NavigationLink" to="/logout" id='logout_link'>Log Out</NavLink>;
};

const clickerNavLinks = () => {
    return <NavLink className="NavigationLink" to="/clicker" id='clicker_link'>Clicker</NavLink>;
};

const NavigationHeader = (props: any) => {
    return (
        <div className="NavigationHeader">
            <NavLink className="NavigationLink" to="/">Home</NavLink>
            {!props.isLoggedIn() && loginNavLinks()}
            {!props.isLoggedIn() && signupNavLinks()}
            {props.isLoggedIn() && clickerNavLinks()}
            {props.isLoggedIn() && logoutNavLinks()}
        </div>
    );
};

export default NavigationHeader;

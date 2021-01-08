import React from 'react';
import {NavLink} from "react-router-dom";

const loginNavLinks = () => {
    return <NavLink className="NavigationLink" to="/login">Log In</NavLink>;
};

const signupNavLinks = () => {
    return <NavLink className="NavigationLink" to="/signup">Sing Up</NavLink>;
};

const logoutNavLinks = () => {
    return <NavLink className="NavigationLink" to="/logout">Log Out</NavLink>;
};

const NavigationHeader = (props: any) => {
    return (
        <div className="NavigationHeader">
            <NavLink className="NavigationLink" to="/">Home</NavLink>
            {!props.isLoggedIn() && loginNavLinks()}
            {!props.isLoggedIn() && signupNavLinks()}
            {props.isLoggedIn() && logoutNavLinks()}
        </div>
    );
};

export default NavigationHeader;

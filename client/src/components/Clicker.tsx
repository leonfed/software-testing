import React, {FormEvent, useState} from 'react';
import {UserInfo} from "../model/UserInfo";

const Login = (props: any) => {
    const getClicks = async (increment: boolean) => {
        const searchParams = new URLSearchParams();
        searchParams.append("login", props.login);
        searchParams.append("password", props.password);
        if (increment) {
            searchParams.append("increment", "true");
        }

        try {
            let response = await fetch('http://localhost:8080/clicks?' + searchParams);
            if (response.ok) {
                const responseJson = await response.json();
                props.updateClicks(responseJson.clicks);
            } else if (response.status === 401) {
                props.forceLogoutFunction()
            }
        } catch (exception) {
            props.errorFunction("Request server error. Please retry")
        }
    };

    if (props.currentClicks === undefined) {
        getClicks(false);
    }

    const click = async (e: FormEvent) => {
        e.preventDefault();
        await getClicks(true);
    };

    return (
        <div className="ClickerBox">
            <div className="ClickerText">{props.currentClicks === undefined ? "unknown" : props.currentClicks}</div>
            <button className="ClickerButton" onClick={click}>Click</button>
        </div>
    );
};

export default Login;

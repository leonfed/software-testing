import React, {FormEvent, useState} from 'react';
import {UserInfo} from "../model/UserInfo";

export enum ClickResponseErrors {
    Authorization = "Problems with authorization. Please, retry or logout and login again.",
    Request = "Request server error. Please retry.",
}

export const getClickResponseError = (status: number) => {
    if (status === 401) {
        return ClickResponseErrors.Authorization;
    } else {
        return ClickResponseErrors.Request;
    }
};

export const Clicker = (props: any) => {
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
            } else {
                const error = getClickResponseError(response.status);
                props.errorFunction(error)
            }
        } catch (exception) {
            props.errorFunction(ClickResponseErrors.Request)
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

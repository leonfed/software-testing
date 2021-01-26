import React, {FormEvent, useState} from 'react';
import {UserInfo} from "../model/UserInfo";

export enum SignupResponseErrors {
    LoginUsed = "This login already exists. Please enter another login.",
    NotAcceptableInput = "Not acceptable input. Please retry.",
    Request = "Request server error. Please retry.",
}

export const getSignupResponseError = (status: number) => {
    if (status === 403) {
        return SignupResponseErrors.LoginUsed;
    } else if (status === 406) {
        return SignupResponseErrors.NotAcceptableInput;
    } else {
        return SignupResponseErrors.Request;
    }
};

export const checkLogin = (login: string) => {
    return /^[A-Za-z0-9_]{3,}$/.test(login);
};

export const checkPassword = (password: string) => {
    return password.length >= 5 && /[A-Z]+/.test(password) && /[a-z]+/.test(password) && /[0-9]+/.test(password);
};

const Signup = (props: any) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const searchParams = new URLSearchParams();
        searchParams.append("login", login);
        searchParams.append("password", password);
        searchParams.append("email", email);

        const userInfo: UserInfo = {login: login, password: password};

        if (!checkLogin(login)) {
            props.errorFunction("Login must be at least 3 symbols long and contain only letters, digits and \"_\"");
            return;
        }
        if (!checkPassword(password)) {
            props.errorFunction("Password must be at least 5 symbols long and contain big letter, small letter and digit");
            return;
        }

        try {
            let response = await fetch('http://localhost:8080/signup?' + searchParams);
            if (response.ok) {
                props.loginFunction(userInfo)
            } else {
                const error = getSignupResponseError(response.status);
                props.errorFunction(error)
            }
        } catch (exception) {
            props.errorFunction(SignupResponseErrors.Request)
        }
    };
    return (
        <form onSubmit={handleSubmit} className="InputForm">
            <div className="InputField">
                <label htmlFor='login' className="InputLabel">Login</label>
                <input type='login' id='login' value={login} onChange={(e) => setLogin(e.target.value)}/>
            </div>
            <div className="InputField">
                <label htmlFor='password' className="InputLabel">Password</label>
                <input type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="InputField">
                <label htmlFor='email' className="InputLabel">Email</label>
                <input type='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <button type="submit" className="InputButton">Sign Up</button>
        </form>
    );
};

export default Signup;

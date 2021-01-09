import React, {FormEvent, useState} from 'react';
import {UserInfo} from "../model/UserInfo";

const Login = (props: any) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const searchParams = new URLSearchParams();
        searchParams.append("login", login);
        searchParams.append("password", password);

        const userInfo: UserInfo = {login: login, password: password};

        try {
            let response = await fetch('http://localhost:8080/login?' + searchParams);
            if (response.ok) {
                props.loginFunction(userInfo)
            } else if (response.status === 401) {
                props.errorFunction("Incorrect login or password")
            } else {
                props.errorFunction("Server error. Please retry")
            }
        } catch (exception) {
            props.errorFunction("Request server error. Please retry")
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
            <button type="submit" className="InputButton">Log in</button>
        </form>
    );
};

export default Login;

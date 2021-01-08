import React, {FormEvent, useState} from 'react';
import {UserInfo} from "../model/UserInfo";

const Login = (props: any) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        var searchParams = new URLSearchParams();
        searchParams.append("login", login);
        searchParams.append("password", password);

        const response = await fetch('http://localhost:8080/login?' + searchParams);
        const userInfo: UserInfo = {login: login, password: password};
        props.loginFunction(userInfo)
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

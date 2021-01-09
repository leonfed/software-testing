import React, {FormEvent, useState} from 'react';
import {UserInfo} from "../model/UserInfo";

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

        try {
            let response = await fetch('http://localhost:8080/signup?' + searchParams);
            if (response.ok) {
                props.loginFunction(userInfo)
            } else if (response.status === 403) {
                props.errorFunction("This login already exists. Please enter another login")
            } else if (response.status === 406) {
                props.errorFunction("Not acceptable input")
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
            <div className="InputField">
                <label htmlFor='email' className="InputLabel">Email</label>
                <input type='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <button type="submit" className="InputButton">Sign Up</button>
        </form>
    );
};

export default Signup;

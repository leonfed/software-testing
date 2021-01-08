import React, {FormEvent, useState} from 'react';

const Signup = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
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

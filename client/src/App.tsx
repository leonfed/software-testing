import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {useCookies} from "react-cookie";

import NavigationHeader from './components/NavigationHeader';
import ErrorPage from './components/ErrorPage';
import ErrorMessage from './components/ErrorMessage';
import Home from './components/Home';
import Login from './components/Login';
import Logout from "./components/Logout";
import Signup from './components/Signup';
import {UserInfo} from "./model/UserInfo";
import {useState} from "react";

function App() {
    const [cookies, setCookie] = useCookies(["login", "password"]);
    const [errorMessage, setErrorMessage] = useState('');

    const clearErrorMessage = () => {
        setErrorMessage('')
    };

    const loginFunction = (userInfo: UserInfo) => {
        clearErrorMessage();
        setCookie("login", userInfo.login, {path: "/"});
        setCookie("password", userInfo.password, {path: "/"});
    };

    const logoutFunction = () => {
        clearErrorMessage();
        setCookie("login", "", {path: "/"});
        setCookie("password", "", {path: "/"});
    };

    const isLoggedIn = () => cookies.login && cookies.password;

    return (
        <BrowserRouter>
            <div className="App">
                <NavigationHeader isLoggedIn={isLoggedIn}/>
                {errorMessage && <ErrorMessage text={errorMessage}/>}
                <Switch>
                    <Route path="/" id="home" component={Home} exact/>
                    <Route path="/home" id="home" component={Home} exact/>
                    <Route path="/signup" id="signup" component={() =>
                        !isLoggedIn()
                            ? Signup()
                            : Home()}/>
                    <Route path="/login" id="login" component={() =>
                        !isLoggedIn()
                            ? <Login loginFunction={loginFunction} errorFunction={setErrorMessage}/>
                            : Home()}/>
                    <Route path="/logout" id="logout" component={() =>
                        isLoggedIn()
                            ? <Logout logoutFunction={logoutFunction}/>
                            : Home()}/>
                    <Route path="/clicker" id="clicker" component={() =>
                        isLoggedIn()
                            ? <div>Clicker</div>
                            : Home()}/>
                    <Route component={ErrorPage}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;

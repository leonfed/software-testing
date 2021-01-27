import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {useCookies} from "react-cookie";

import NavigationHeader from './components/NavigationHeader';
import {ErrorPage} from './components/ErrorPage';
import ErrorMessage from './components/ErrorMessage';
import {Home} from './components/Home';
import Login from './components/Login';
import Logout from "./components/Logout";
import Signup from './components/Signup';
import {Clicker} from './components/Clicker';
import {UserInfo} from "./model/UserInfo";
import {useState} from "react";

interface Clicks {
    clicks?: number
}

function App() {
    const [cookies, setCookie] = useCookies(["login", "password"]);
    const [errorMessage, setErrorMessage] = useState('');

    const initialClicks: Clicks = {};
    const [clicks, setClicks] = useState(initialClicks);

    const clearErrorMessage = () => setErrorMessage('');

    console.log(clicks.clicks);

    const clearUser = () => {
        setCookie("login", "", {path: "/"});
        setCookie("password", "", {path: "/"});
    };

    const loginFunction = (userInfo: UserInfo) => {
        clearErrorMessage();
        setCookie("login", userInfo.login, {path: "/"});
        setCookie("password", userInfo.password, {path: "/"});
    };

    const logoutFunction = () => {
        clearErrorMessage();
        clearUser();
        setClicks(initialClicks);
    };

    const updateClicks = (clicks: number) => {
        clearErrorMessage();
        setClicks({clicks: clicks});
    };

    const isLoggedIn = () => cookies.login && cookies.password;

    return (
        <BrowserRouter>
            <div className="App" id="app">
                <NavigationHeader isLoggedIn={isLoggedIn}/>
                {errorMessage && <ErrorMessage text={errorMessage}/>}
                <Switch>
                    <Route path="/" id="home" component={Home} exact/>
                    <Route path="/home" id="home" component={Home} exact/>
                    <Route path="/signup" id="signup" component={() =>
                        !isLoggedIn()
                            ? <Signup loginFunction={loginFunction} errorFunction={setErrorMessage}/>
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
                            ? <Clicker errorFunction={setErrorMessage}
                                       updateClicks={updateClicks}
                                       login={cookies.login}
                                       password={cookies.password}
                                       currentClicks={clicks.clicks}/>
                            : Home()}/>
                    <Route component={ErrorPage}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;

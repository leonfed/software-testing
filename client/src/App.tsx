import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {useCookies} from "react-cookie";

import NavigationHeader from './components/NavigationHeader';
import Error from './components/Error';
import Home from './components/Home';
import Login from './components/Login';
import Logout from "./components/Logout";
import Signup from './components/Signup';
import {UndefinedUser, UserInfo} from "./model/UserInfo";

function App() {
    const [cookies, setCookie] = useCookies(["login", "password"]);

    const loginFunction = (userInfo: UserInfo) => {
        setCookie("login", userInfo.login, {path: "/"});
        setCookie("password", userInfo.password, {path: "/"});
    };

    const logoutFunction = () => {
        setCookie("login", "", {path: "/"});
        setCookie("password", "", {path: "/"});
    };

    const isLoggedIn = () => cookies.login && cookies.password;

    return (
        <BrowserRouter>
            <div className="App">
                <NavigationHeader isLoggedIn={isLoggedIn}/>
                <div>{"Login:" + cookies.login + "   Password: " + cookies.password}</div>
                <Switch>
                    <Route path="/" id="home" component={Home} exact/>
                    <Route path="/home" id="home" component={Home} exact/>
                    <Route path="/signup" id="signup"
                           component={() => !isLoggedIn() ? Signup() : Home()}/>
                    <Route path="/login" id="login"
                           component={() => !isLoggedIn() ? <Login loginFunction={loginFunction}/> : Home()}/>
                    <Route path="/logout" id="logout"
                           component={() => isLoggedIn() ? <Logout logoutFunction={logoutFunction}/> : Home()}/>
                    <Route path="/clicker" id="clicker"
                           component={() => isLoggedIn() ? <div>Clicker</div> : Home()}/>
                    <Route path="/results" id="results" component={() => <div>Results</div>}/>
                    <Route component={Error}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;

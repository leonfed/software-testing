import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

const Error = () => {
    return (
        <div>
            <p>Page Not Found</p>
        </div>
    );
};

const Home = () => {
    return (
        <div>
            <p>Home</p>
        </div>
    );
};


function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Switch>
                    <Route path="/" id="home" component={Home} exact/>
                    <Route path="/home" id="home" component={Home} exact/>
                    <Route path="/signup" id="signup" component={() => <div>Sign Up</div>}/>
                    <Route path="/login" id="login" component={() => <div>Log In</div>}/>
                    <Route path="/clicker" id="login" component={() => <div>Clicker</div>}/>
                    <Route path="/results" id="login" component={() => <div>Results</div>}/>
                    <Route component={Error}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;

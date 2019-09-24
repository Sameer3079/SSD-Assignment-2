import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { Route, Switch, Router } from "react-router-dom";

import Login from './pages/Login'
import Home from './pages/Home'
import CallbackPage from './pages/CallbackPage'

import history from './history'

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Switch>

          {/* Login Page (Landing Page) */}
          <Route component={Login} exact path="/"></Route>

          {/* Callback Route, receives the Access Token */}
          <Route component={CallbackPage} path="/callback"></Route>

          {/* Home Page - Where all functionality exists */}
          <Route component={Home} path="/home"></Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;

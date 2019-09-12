import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Link, Switch, Router } from "react-router-dom";

import Login from './pages/Login'
import Home from './pages/Home'

import history from './history'

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route component={Home} path="/home"></Route>
          <Route component={Login} exact path="/"></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

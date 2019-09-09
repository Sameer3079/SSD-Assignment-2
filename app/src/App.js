import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";

import Login from './pages/Login'
import Home from './pages/Home'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route component={Home} path="/home"></Route>
          <Route component={Login} exact path="/"></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

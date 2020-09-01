import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import {UserContext} from './context/UserContext';
import Welcome from './components/Welcome';
import Dashboard from './components/Dashboard';

function App() {
  const [user, setUser] = useState({})
  let context = {user, setUser}
  return (
    <UserContext.Provider value={context}>
    <Router>
      <Switch>
        <Route exact path="/">
          <Welcome />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
      </Switch>
    </Router>
    </UserContext.Provider>
  );
}

export default App;

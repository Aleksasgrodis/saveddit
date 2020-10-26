import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { UserContext } from './context/UserContext';
import Welcome from './components/Welcome';
import Dashboard from './components/Dashboard';
// import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || {},
  );
  const context = { user, setUser };
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);
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
          {/* <ProtectedRoute path="/dashboard" component={Dashboard} /> */}
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;

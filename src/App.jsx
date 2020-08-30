import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import {UserContext} from './context/UserContext';
import Url from 'url-parse';
import { useContext } from 'react';
import { useEffect } from 'react';

const Login = () => {
  const handleAuthorize = () => {
    const seed = uuidv4();
    localStorage.setItem('seed', seed);
    Axios.post('/api/authorize', {
      seed,
    })
      .then(res => {
        window.location = res.data.url;
      })
      .catch(err => console.log(err));
  };
  return (
    <div>
      <h2>Hello, i am login</h2>
      <button
        onClick={() => handleAuthorize()}
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Authorize
      </button>
    </div>
  );
};

const Dashboard = () => {
  const url = new Url(window.location, true)
  const { user, setUser } = useContext(UserContext)
  const seed = localStorage.getItem('seed');
  useEffect(() => {
    if (url && url.query.state === seed) {
      setUser({...user, code: url.query.code})
    }
  }, [])
  
  return (
    <div className="dashboard">
      <h2>welcome</h2>
    </div>
  );
};

function App() {
  const [user, setUser] = useState({})
  let context = {user, setUser}
  return (
    <UserContext.Provider value={context}>
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
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

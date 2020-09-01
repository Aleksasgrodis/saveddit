import React, { useContext, useEffect } from 'react';
import URLParse from 'url-parse';
import { UserContext } from '../context/UserContext';
import { useSelector, useDispatch } from 'react-redux';
import { addToken, addUsername, addSaved } from '../actions';
import { useState } from 'react';

//! Persist needs to be reworked
//! Fetching /saved returns empty listing json
//TODO Keep track of token expires
const Dashboard = () => {
  const url = new URLParse(window.location, true);
  // const { user, setUser } = useContext(UserContext);
  const seed = localStorage.getItem('seed');

  const user = useSelector(state => state.user);
  const data = useSelector(state => state.data);

  const [after, setAfter] = useState(null);
  const [count, setCount] = useState(100);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserToken = code => {
      if (!user.token) {
        fetch(`/api/token?code=${code}`)
          .then(res => res.json())
          .then(data => {
            dispatch(addToken(data.access_token));
            fetchUserName(data.access_token);
          })
          .catch(err => console.log(err));
      }
    };

    const fetchUserName = token => {
        fetch(`/api/username`, {
          method: 'POST',
          body: JSON.stringify({
            token: token,
          }),
        })
          .then(res => res.json())
          .then(data => {
            dispatch(addUsername(data.name));
            fetchSaved();
          })
          .catch(err => console.log(err));
    };

    const fetchSaved = () => {
      fetch(`/api/fetch`, {
        method: 'POST',
        body: JSON.stringify({
          token: user.token,
          username: user.username,
        }),
      })
        .then(res => res.json())
        .then(({ data }) => {
          console.log('data got');

          dispatch(addSaved(data.children.map(a => a.data)));
          setAfter(data.after);
          setCount(data.dist);
        })
        .catch(err => console.log(err));
    };

    if (url && url.query.state === seed) {
      fetchUserToken(url.query.code);
    }
  }, []);

  useEffect(() => {
    const fetchSaved = () => {
      if (user.token && user.username) {
        fetch(`/api/fetch`, {
          method: 'POST',
          body: JSON.stringify({
            token: user.token,
            username: user.username,
            after,
          }),
        })
          .then(res => res.json())
          .then(({ data }) => {
            console.log(data);
            dispatch(addSaved(data.children.map(a => a.data)));
            setAfter(data.after);
            setCount(data.dist);
          })
          .catch(err => console.log(err));
      }
    };
    if (after && count === 100) {
      fetchSaved();
    }
  }, [after, count, user.username, user.token, dispatch]);

  return (
    <div className="dashboard">
      <h2>Welcome, {user.username ? user.username : 'person!'}</h2>
    </div>
  );
};

export default Dashboard;

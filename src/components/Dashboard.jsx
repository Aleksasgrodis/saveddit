import React, { useContext, useEffect } from 'react';
import URLParse from 'url-parse';
import { UserContext } from '../context/UserContext';
import { useSelector, useDispatch } from 'react-redux';
import { addToken, addUsername } from '../actions';

//! Persist needs to be reworked
//! Fetching /saved returns empty listing json
//TODO Keep track of token expires 
const Dashboard = () => {
  const url = new URLParse(window.location, true);
  // const { user, setUser } = useContext(UserContext);
  const seed = localStorage.getItem('seed');

  const user = useSelector(state => state.user);
  const data = useSelector(state => state.data);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserToken = code => {
      if (!user.token) {
        fetch(`/api/token?code=${code}`)
          .then(res => res.json())
          .then(data => {
            dispatch(addToken(data.access_token));
          })
          .catch(err => console.log(err));
      } else {
        fetchUserName(user.token);
      }
    };

    const fetchUserName = token => {
      if (user.token && !user.username) {
        console.log('no username');
        fetch(`/api/username`, {
          method: 'POST',
          body: JSON.stringify({
            token: user.token,
          }),
        })
          .then(res => res.json())
          .then(data => {
            dispatch(addUsername(data.name));
          })
          .catch(err => console.log(err));
      }
      if (user.token && user.username) {
        fetchSaved();
      }
    };

    const fetchSaved = () => {
      if (user.token && user.username) {
        fetch(`/api/fetch`, {
          method: 'POST',
          body: JSON.stringify({
            token: user.token,
            username: user.username,
          }),
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
          })
          .catch(err => console.log(err));
      }
    };

    if (url && url.query.state === seed) {
      fetchUserToken(url.query.code);
    }
  }, []);

  return (
    <div className="dashboard">
      <h2>Welcome, {user.username ? user.username : 'person!'}</h2>
    </div>
  );
};

export default Dashboard;

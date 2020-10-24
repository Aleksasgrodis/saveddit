import React, { useContext, useEffect } from 'react';
import URLParse from 'url-parse';
import { UserContext } from '../context/UserContext';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addLinks, hasFinished } from '../redux/actions';

//TODO Keep track of token expires
const Dashboard = () => {
  const { setUser, user } = useContext(UserContext);
  const [after, setAfter] = useState(null);
  const [count, setCount] = useState(100);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const url = new URLParse(window.location, true);
    const seed = localStorage.getItem('seed');
    const fetchUserToken = code => {
      if (!user.token) {
        fetch(`/api/token?code=${code}`)
          .then(res => res.json())
          .then(data => {
            setUser({ ...user, token: data.access_token });
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
          setUser(prevstate => {
            return { ...prevstate, name: data.name };
          });
        })
        .catch(err => console.log(err));
    };
    
    if (url && url.query.state === seed) {
      fetchUserToken(url.query.code);
    }
  }, [setUser, user]);

  useEffect(() => {
    if (user.token && user.name) {
      const fetchSaved = () => {
        fetch(`/api/fetch`, {
          method: 'POST',
          body: JSON.stringify({
            token: user.token,
            username: user.name,
          }),
        })
          .then(res => res.json())
          .then(({ after, dist, links }) => {
            console.log(links);
            setLoading(true);
            dispatch(addLinks({ links: links }));
            setAfter(after);
            setCount(dist);
          })
          .catch(err => console.log(err));
      };
      fetchSaved();
    }
  }, [user, dispatch]);

  useEffect(() => {
    const fetchSaved = () => {
      fetch(`/api/fetch`, {
        method: 'POST',
        body: JSON.stringify({
          token: user.token,
          username: user.name,
          after,
        }),
      })
        .then(res => res.json())
        .then(({ after, dist, links }) => {
          dispatch(addLinks({ links: links }));
          setAfter(after);
          setCount(dist);
        })
        .catch(err => console.log(err));
    };
    if (after && count === 100) {
      fetchSaved();
    }
    if (count < 100) {
      setLoading(false);
      dispatch(hasFinished({ status: true }));
    }
    console.log('second effect');
  }, [after, count, user, dispatch]);

  const signOut = () => {
    localStorage.clear();
  };

  return (
    <div className="dashboard">
      <h2>Welcome, {user.name ? user.name : 'person!'}</h2>
      <p>{loading ? 'Loading' : 'Finished'}</p>
      <button onClick={() => signOut()}>Log out</button>
    </div>
  );
};

export default Dashboard;

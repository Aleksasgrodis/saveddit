import React, { useContext, useEffect } from 'react';
import URLParse from 'url-parse';
import { UserContext } from '../context/UserContext';
import { batch, useDispatch, useSelector } from 'react-redux';
import { addBatch, addLinks, setFetchCount, setLoadingStatus } from '../redux/actions';

//TODO Keep track of token expires
const Dashboard = () => {
  const { setUser, user } = useContext(UserContext);
  const dispatch = useDispatch();

  const { hasErrored, isLoading, total, after, fetchCount } = useSelector(state => state.saved);

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
    if (user.token && user.name && !localStorage.getItem('saved')) {
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
            dispatch(setLoadingStatus({ status: true }));
            dispatch(addBatch({ links: links, count: dist, after: after }));
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
          dispatch(addBatch({ links: links, count: dist, after: after }));
        })
        .catch(err => console.log(err));
    };
    if (after && fetchCount === 100 && isLoading) {
      fetchSaved();
    }
    if (fetchCount < 100) {
      dispatch(setLoadingStatus({ status: false }));
    }
  }, [after, fetchCount, user, dispatch, isLoading]);

  const signOut = () => {
    localStorage.clear();
  };

  return (
    <div className="dashboard">
      <h2>Welcome, {user.name ? user.name : 'person!'}</h2>
      <p>{isLoading ? `Loading.. ${total}` : 'Finished: ' + total}</p>
      <button onClick={() => signOut()}>Log out</button>
    </div>
  );
};

export default Dashboard;

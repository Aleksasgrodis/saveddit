import React, { useContext, useEffect } from 'react';
import URLParse from 'url-parse';
import { UserContext } from '../context/UserContext';
import { useState } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { addBatch, addLinks, setFetchCount, setLoadingStatus } from '../redux/actions';

//TODO Keep track of token expires
const Dashboard = () => {
  const { setUser, user } = useContext(UserContext);
  const [after, setAfter] = useState(null);
  const [count, setCount] = useState(100);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // const { fetching, hasErrored, isLoading, total, after, fetchCount } = useSelector(state => state.saved);
  // console.log(state);

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
            console.log('this is fine');
            setLoading(true); // remove if works
            setAfter(after); // remove if works
            setCount(dist); // remove if works
            dispatch(addBatch({ links: links, count: dist, after: after }));
            // batch(() => {
              
            //   // dispatch(setLoadingStatus({ status: true }));
            //   // dispatch(setAfter({ after: after }));
            //   // dispatch(setFetchCount({ count: dist }));
            // });
            console.log('this is fine 2');
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
          console.log('still fine');
          dispatch(addBatch({ links: links, count: dist, after: after }));
          // batch(() => {
          //   dispatch(addLinks({ links: links }));
          //   // dispatch(setAfter({ after: after }));
          //   // dispatch(setFetchCount({ count: dist }));
          // });
          setAfter(after); // remove if works
          setCount(dist); // remove if works
          console.log('still fine 2');
        })
        .catch(err => console.log(err));
    };
    if (after && count === 100) {
      fetchSaved();
    }
    if (count < 100) {
      setLoading(false);
      dispatch(setLoadingStatus({ status: false }));
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

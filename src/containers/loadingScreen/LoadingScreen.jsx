import React, { useContext, useEffect } from 'react';
import URLParse from 'url-parse';
import { UserContext } from '../../context/UserContext';
import { useDispatch, useSelector } from 'react-redux';
import { addBatch, setLoadingStatus } from '../../redux/actions';
import { Redirect } from 'react-router-dom';

//TODO Keep track of token expires
const LoadingScreen = () => {
  const { setUser, user } = useContext(UserContext);
  const dispatch = useDispatch();

  const { isLoading, total, afterListing, fetchCount } = useSelector(
    state => state.saved,
  );

  useEffect(() => {
    const url = new URLParse(window.location, true);
    const seed = localStorage.getItem('seed');
    const fetchUserToken = code => {
      if (!user.token) {
        fetch(`/api/token?code=${code}`)
          .then(res => res.json())
          .then(data => {
            setUser({
              ...user,
              token: data.access_token,
              refresh_token: data.refresh_token,
            });
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
            return {
              ...prevstate,
              name: data.name,
              avatar: data.icon_img,
              account_created: data.created_utc,
              karma: data.total_karma,
              verified: data.verified,
              coins: data.coins,
            };
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
            dispatch(addBatch({ links: links, count: dist, afterListing: after }));
          })
          .catch(err => console.log(err));
      };
      fetchSaved();
    }
  }, [user, dispatch]);

  useEffect(() => {
    const fetchSaved = async () => {
      fetch(`/api/fetch`, {
        method: 'POST',
        body: JSON.stringify({
          token: user.token,
          username: user.name,
          afterListing,
        }),
      })
        .then(res => res.json())
        .then(({ after, dist, links }) => {
          dispatch(addBatch({ links: links, count: dist, afterListing: after }));
        })
        .catch(err => console.log(err));
    };
    if (afterListing && fetchCount === 100 && isLoading) {
      fetchSaved();
    }
    if (fetchCount < 100) {
      dispatch(setLoadingStatus({ status: false }));
    }
  }, [afterListing, fetchCount, user, dispatch, isLoading]);

  if (!isLoading) {
    return <Redirect to="/dashboard/all" />;
  }

  return (
    <div className="container mx-auto h-screen flex flex-col justify-center">
      <div className="self-center font-mono">
        <h2 className="font-bold text-4xl">
          Welcome, {user.name ? user.name : 'redditor.'}.
        </h2>
        <p>
          Please wait while we fetch your saved threads and links, this may take
          a few seconds.
        </p>
        <p>{isLoading ? `Count: ${total}` : 'Done!'}</p>
      </div>
    </div>
  );
};

export default LoadingScreen;

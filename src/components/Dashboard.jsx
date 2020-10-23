import React, { useContext, useEffect } from 'react';
import URLParse from 'url-parse';
import { UserContext } from '../context/UserContext';
import { useState } from 'react';

//TODO Keep track of token expires
const Dashboard = () => {
  const url = new URLParse(window.location, true);
  // const { user, setUser } = useContext(UserContext);
  const seed = localStorage.getItem('seed');
  const { setUser, user } = useContext(UserContext);
  const [after, setAfter] = useState(null);
  const [count, setCount] = useState(100);

  const minifyReponse = array => {
    return array.map(
      ({
        author,
        archived,
        clicked,
        created_utc,
        domain,
        id,
        num_comments,
        over_18,
        permalink,
        score,
        subreddit_name_prefixed,
        title,
        url,
      }) => ({
        author,
        archived,
        clicked,
        created_utc,
        domain,
        id,
        num_comments,
        over_18,
        permalink,
        score,
        subreddit_name_prefixed,
        title,
        url,
      }),
    );
  };

  useEffect(() => {
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
          // fetchSaved();
        })
        .catch(err => console.log(err));
    };

    

    if (user.token && user.name) {
      const fetchSaved = () => {
        console.log('fetch saved');
        fetch(`/api/fetch`, {
          method: 'POST',
          body: JSON.stringify({
            token: user.token,
            username: user.name,
          }),
        })
          .then(res => res.json())
          .then(({ data }) => {
            console.log('data got', data);
            setUser(prevstate => {
              return { ...prevstate, data: minifyReponse(data.children.map(a => (a.data))) };
            });
            setAfter(data.after);
            setCount(data.dist);
          })
          .catch(err => console.log(err));
      };
      fetchSaved();
    }

    if (url && url.query.state === seed) {
      fetchUserToken(url.query.code);
    }
  }, []);

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
        .then(({ data }) => {
          setUser(prevstate => {
            return {
              ...prevstate,
              data: [...prevstate.data, ...minifyReponse(data.children.map(a => a.data))],
            };
          });
          setAfter(data.after);
          setCount(data.dist);
        })
        .catch(err => console.log(err));
    };
    if (after && count === 100) {
      console.log('fetched hunna');
      fetchSaved();
    }
  }, [after, count, user.username, user.token]);

  return (
    <div className="dashboard">
      <h2>Welcome, {user.name ? user.name : 'person!'}</h2>
    </div>
  );
};

export default Dashboard;

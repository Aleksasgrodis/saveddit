import React, { useContext, useEffect } from 'react';
import URLParse from 'url-parse';
import { UserContext } from '../context/UserContext';

const Dashboard = () => {
  const url = new URLParse(window.location, true);
  const { user, setUser } = useContext(UserContext);
  const seed = localStorage.getItem('seed');
  useEffect(() => {
    const fetchUserToken = code => {
      fetch(`/api/token?code=${code}`)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          console.log(data.access_token);
          fetchUserName(data.access_token)})
        .catch(err => console.log(err));
    };

    const fetchUserName = token => {
      fetch(`/api/username`, {
        method: 'POST',
        body: JSON.stringify({
          token: token
        })
      })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          // CONTINUE HERE
          // Take name and anything else necessary from response into state 
          // then fetch data
          setUser({...user, name: data.name})
        })
        .catch(err => console.log(err));
    }

    if (url && url.query.state === seed) {
      setUser({ ...user, code: url.query.code });
      fetchUserToken(url.query.code);
    }
  }, []);

  return (
    <div className="dashboard">
      <h2>welcome</h2>
    </div>
  );
};

export default Dashboard;

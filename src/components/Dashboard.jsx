import React, { useContext, useEffect } from 'react'
import URLParse from 'url-parse';
import { UserContext } from '../context/UserContext';

const Dashboard = () => {
  const url = new URLParse(window.location, true)
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

export default Dashboard

import React from 'react';
import Axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const Login = () => {
  const handleAuthorize = () => {
    const seed = uuidv4();
    localStorage.clear();
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
    <div className="flex justify-center">
      <button
        onClick={() => handleAuthorize()}
        type="button"
        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mr-3"
      >
        Authorize
      </button>
    </div>
  );
};

export default Login;

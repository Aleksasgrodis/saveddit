import React from 'react';
import { useContext } from 'react';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import UserInfo from './UserInfo';

function SideBar() {
  const {
    user: { refresh_token },
    setUser,
    user,
  } = useContext(UserContext);
  let history = useHistory();
  const signOut = () => {
    localStorage.clear();
    history.push('/');
  };
  console.log(user);
  const requestRefreshToken = () => {
    fetch(`/api/refresh?token=${refresh_token}`)
      .then(res => res.json())
      .then(data => {
        if (data.access_token) {
          setUser({ ...user, token: data.access_token });
          localStorage.removeItem('saved');
          history.push('/loading');
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="flex flex-col justify-around h-screen w-full">
      <div>
        <UserInfo />
      </div>
      <div className="flex flex-col justify-center">
        <NavLink
          className="bg-white hover:bg-gray-100 text-gray-800 py-2 px-4 border border-gray-400 rounded shadow border rounded p-2 mb-2 text-center"
          activeClassName="font-bold text-blue-600 border-b-4"
          to="/dashboard/all"
        >
          All
        </NavLink>
        <NavLink
          className="bg-white hover:bg-gray-100 text-gray-800 py-2 px-4 border border-gray-400 rounded shadow border rounded p-2 mb-2 text-center"
          activeClassName="font-bold text-blue-600 border-b-4"
          to="/dashboard/subreddits"
        >
          Subreddits
        </NavLink>
        <NavLink
          className="bg-white hover:bg-gray-100 text-gray-800 py-2 px-4 border border-gray-400 rounded shadow border rounded p-2 mb-2 text-center"
          activeClassName="font-bold text-blue-600 border-b-4"
          to="/dashboard/nsfw"
        >
          NSFW
        </NavLink>
      </div>
      <div className="flex flex-col">
        <button
          type="button"
          className="mb-2 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          onClick={() => requestRefreshToken()}
        >
          Refresh
        </button>
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          onClick={() => signOut()}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default SideBar;

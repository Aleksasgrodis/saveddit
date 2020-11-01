import React from 'react';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import UserInfo from './UserInfo';

function SideBar() {

  let history = useHistory();
  const signOut = () => {
    localStorage.clear();
    history.push('/')
  };

  return (
    <div className="flex flex-col justify-around h-screen w-full">
      <div><UserInfo /></div>
      <div className="flex flex-col justify-center">
        <NavLink to="/dashboard/all">All</NavLink>
        <NavLink to="/dashboard/subreddits">Subreddits</NavLink>
        <NavLink to="/dashboard/nsfw">NSFW</NavLink>
      </div>
      <div className="flex flex-col">
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
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

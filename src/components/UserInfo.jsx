import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

function UserInfo() {
  const {
    user: { avatar, karma, name },
  } = useContext(UserContext);
  return (
    <div className="container flex mx-auto w-full justify-center">
      <img className="h-12 w-12 rounded mr-2" src={avatar} alt="user avatar" />
      <div className="self-center">
        <h2 className="text-lg">
          <span className="font-bold">{name}</span>
        </h2>
        <div className="text-orange-500">{karma} karma</div>
      </div>
    </div>
  );
}

export default UserInfo;

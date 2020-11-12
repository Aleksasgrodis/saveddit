import React from 'react';
import { useSelector } from 'react-redux';

function UserInfo() {
  const { avatar, karma, name } = useSelector(state => state.user);
  return (
    <div className="container flex mx-auto w-full justify-center rounded-md">
      <img className="h-12 w-12 rounded mr-2" src={avatar} alt="user avatar" />
      <div className="self-center">
        <h2 className="text-lg">
          <span className="font-bold text-gray-900">{name}</span>
        </h2>
        <div className="text-orange-500">{karma} karma</div>
      </div>
    </div>
  );
}

export default UserInfo;

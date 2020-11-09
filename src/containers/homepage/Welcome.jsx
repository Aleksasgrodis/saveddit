import React from 'react';
import Login from './components/Login';
import { ReactComponent as Logo } from '../../assets/images/saveddit.svg';

function Welcome() {
  return (
    <div className="lg:container lg:mx-auto flex">
      <div className="container flex h-screen flex-col justify-center">
        <div className="container flex h-64 flex-col justify-between">
          <div className="container logo">
            <Logo />
          </div>
          <div className="container">
            <Login />
          </div>
        </div>
      </div>
      <div className="container h-screen flex flex-col justify-center">
        <img
          src="https://static.dribbble.com/users/2007356/screenshots/6625574/file_manager_2x.png"
          alt="dashboard of product"
        />
      </div>
    </div>
  );
}

export default Welcome;

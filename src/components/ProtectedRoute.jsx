import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={props =>
        user.name && user.token ? <Component {...props} /> : <Redirect to={'/'} />
      }
    />
  );
};

export default ProtectedRoute;

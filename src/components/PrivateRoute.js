import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { getCurrentUser } from '../services/authService';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = getCurrentUser();

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props} user={user} />
        ) :
          <Redirect to='/loginuser' />
      }
    />
  );
}

export default PrivateRoute;

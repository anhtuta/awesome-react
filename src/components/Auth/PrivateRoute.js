import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { auth } from './Auth';

const PrivateRoute = ({ component: Component, userInfo, ...rest }) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /login page
    <Route
      {...rest}
      render={(props) =>
        auth.isAuthenticated() ? (
          <Component {...props} userInfo={userInfo} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;

/*
<Component {...props} userInfo={userInfo} />
Hiện tại chưa thấy dùng props
*/

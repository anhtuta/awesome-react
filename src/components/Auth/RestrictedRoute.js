import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { auth } from './Auth';

const RestrictedRoute = ({ component: Component, ...rest }) => {
  return (
    // Show the component only when the user is NOT logged in
    // Otherwise, redirect the user to home page
    <Route
      {...rest}
      render={(props) =>
        auth.isAuthenticated() ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export default RestrictedRoute;

import React from 'react';
import {
  Route,
  Redirect,
  RouteProps
} from 'react-router-dom';

import { getToken } from '../../services/authService';

const ProtectedRoute: React.FC<RouteProps> = (props) => {
  const token = getToken();

  if (!token) {
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: {
            from: props.location
          }
        }}
      />
    );
  }

  return <Route {...props} />;
};

export default ProtectedRoute;
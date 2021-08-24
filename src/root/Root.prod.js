import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from '../containers/Login';
import PrivateRoute from './PrivateRoute';


const Root = () => {
  return (
    <Switch>
      <Route path="/" component={Login}></Route>
    </Switch>
  );
};
export default Root;

import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from '../containers/Login';
import PlayerProblems from '../containers/PlayerProblems';
import PrivateRoute from './PrivateRoute';

const Root = () => {
  return (
    <Switch>
      <PrivateRoute path='/game/:gameId/player_problems' component={PlayerProblems} />
      <Route path='/' component={Login} />
    </Switch>
  );
};
export default Root;

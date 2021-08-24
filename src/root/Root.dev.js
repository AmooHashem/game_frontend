import React from 'react';
import { Route, Switch } from 'react-router-dom';

import CorrectAnswer from '../containers/CorrectAnswer';
import Login from '../containers/Login';
import PlayerProblems from '../containers/PlayerProblems';
import ProblemView from '../containers/ProblemView';
import PrivateRoute from './PrivateRoute';

const Root = () => {
  return (
    <Switch>
      <Route path='/game/:gameId/correct_answer' component={CorrectAnswer} />
      <PrivateRoute path='/game/:gameId/player_problems' component={PlayerProblems} />
      <PrivateRoute path='/game/:gameId/problem/:problemId/' component={ProblemView} />
      <Route path='/' component={Login} />
    </Switch>
  );
};
export default Root;

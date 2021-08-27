import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Login from '../containers/Login';
import AddProblem from '../containers/Mentor/AddProblem';
import CorrectAnswer from '../containers/Mentor/CorrectAnswer';
import Auction from '../containers/Player/Auction';
import PlayerProblems from '../containers/Player/PlayerProblems';
import ProblemView from '../containers/Player/ProblemView';
import Scoreboard from '../containers/Player/Scoreboard';
import PrivateRoute from './PrivateRoute';

const Root = () => {
  return (
    <Switch>
      <Route path='/game/:gameId/mentor/correct_answer/' component={CorrectAnswer} />
      <Route path='/game/:gameId/mentor/add_problem/' component={AddProblem} />
      <Route path='/game/:gameId/scoreboard/' component={Scoreboard} />

      <PrivateRoute path='/game/:gameId/auction/' component={Auction} />
      <PrivateRoute path='/game/:gameId/player_problems/' component={PlayerProblems} />
      <PrivateRoute path='/game/:gameId/problem/:problemId/' component={ProblemView} />
      <Route path='/' component={Login} />
      <Route path="*" render={() => <Redirect to={{ pathname: '/' }} />} />
    </Switch>
  );
};
export default Root;

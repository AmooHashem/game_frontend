import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AddProblem from '../containers/AddProblem';
import Auction from '../containers/Auction';
import CorrectAnswer from '../containers/CorrectAnswer';
import Login from '../containers/Login';
import PlayerProblems from '../containers/PlayerProblems';
import ProblemView from '../containers/ProblemView';
import Scoreboard from '../containers/Scoreboard';
import PrivateRoute from './PrivateRoute';

const Root = () => {
  return (
    <Switch>
      <PrivateRoute path='/game/:gameId/auction/' component={Auction} />
      <PrivateRoute path='/game/:gameId/correct_answer' component={CorrectAnswer} />
      <PrivateRoute path='/game/:gameId/add_problem' component={AddProblem} />
      <PrivateRoute path='/game/:gameId/scoreboard' component={Scoreboard} />
      <PrivateRoute path='/game/:gameId/player_problems' component={PlayerProblems} />
      <PrivateRoute path='/game/:gameId/problem/:problemId/' component={ProblemView} />
      <Route path="/" component={Login}></Route>
    </Switch>
  );
};
export default Root;

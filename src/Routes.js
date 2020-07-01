import React from 'react';
import { Switch, Route } from "react-router-dom";
import NewGame from './NewGame'
import Scores from './Scores'
import GraphContainer from './GraphContainer'
import NotFound from './NotFound'
import Login from './Login'
import PrivateRoute from './PrivateRoute'


function Routes({setToken}) {

  return (
    <div>
      <Switch>
        <Route exact path="/"></Route>
        <Route exact path="/login"><Login setToken={setToken}/></Route>
        <PrivateRoute exact path="/newgame"><NewGame /></PrivateRoute>
        <PrivateRoute exact path="/scores"><Scores /></PrivateRoute>
        <PrivateRoute exact path="/graph"><GraphContainer /></PrivateRoute>
        <Route><NotFound /></Route>
      </Switch>
    </div>
  );
}

export default Routes;

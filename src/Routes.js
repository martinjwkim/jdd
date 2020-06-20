import React, {useState} from 'react';
import { Switch, Route } from "react-router-dom";
import GameForm from './GameForm'
import NewGame from './NewGame'
import Scores from './Scores'
import NotFound from './NotFound'
import Login from './Login'


function Routes({setToken}) {

  return (
    <div>
      <Switch>
        <Route exact path="/"><GameForm /></Route>
        <Route exact path="/login"><Login setToken={setToken}/></Route>
        <Route exact path="/newgame"><NewGame /></Route>
        <Route exact path="/scores"><Scores /></Route>
        <Route><NotFound /></Route>
      </Switch>
    </div>
  );
}

export default Routes;

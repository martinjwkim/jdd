import React from 'react';
import { Switch, Route } from "react-router-dom";
import NewGame from './NewGame'
import NotFound from './NotFound'


function Routes() {
  
  return (
    <div>
      <Switch>
        <Route exact path="/"></Route> 
        <Route exact path="/newgame"><NewGame /></Route>
        <Route><NotFound /></Route>
      </Switch>
    </div>
  );
}

export default Routes;

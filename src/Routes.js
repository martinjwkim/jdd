import React, {useState} from 'react';
import { Switch, Route } from "react-router-dom";
import GameForm from './GameForm'
import NewGame from './NewGame'
import Scores from './Scores'
import NotFound from './NotFound'


function Routes() {

  const [round, setRound] = useState(0);
  const [players, setPlayers] = useState({});

  return (
    <div>
      <Switch>
        <Route exact path="/"><GameForm setRound={setRound} setPlayers={setPlayers} /></Route>
        <Route exact path="/newgame"><NewGame round={round} players={players} setRound={setRound}/></Route>
        <Route exact path="/scores"><Scores /></Route>
        <Route><NotFound /></Route>
      </Switch>
    </div>
  );
}

export default Routes;

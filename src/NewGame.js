import React, {useState} from 'react';
import GameForm from './GameForm'
import RoundForm from './RoundForm'
import ScoresTable from './ScoresTable'

function NewGame() {

  const [round, setRound] = useState(0);
  const [players, setPlayers] = useState({});
  const [scores, setScores] = useState({});

  return (
    <div>
      {round === 0 
      ? <GameForm setRound={setRound} setPlayers={setPlayers}/> 
      : <RoundForm setRound={setRound} round={round} players={players} scores={scores} setScores={setScores}/>}
      <ScoresTable />
    </div>
  );
}

export default NewGame;
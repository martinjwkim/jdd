import React, {useState} from 'react';
import GameForm from './GameForm'
import RoundForm from './RoundForm'
import FinalScores from './FinalScores'

function NewGame() {

  const [round, setRound] = useState(0);
  const [players, setPlayers] = useState({});
  const [scores, setScores] = useState({});
  const [multiplier, setMultipler] = useState(0.1)

  return (
    <div>
      {round === 0 && <GameForm setRound={setRound} setPlayers={setPlayers}/>}
      {round > 0 && round <= 10 && <RoundForm setRound={setRound} round={round} players={players} scores={scores} setScores={setScores}/>}
      {round > 10 && <FinalScores players={players} scores={scores} round={round} multiplier={multiplier}/>}
    </div>
  );
}

export default NewGame;
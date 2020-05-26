import React, {useState} from 'react';
import GameForm from './GameForm'
import RoundForm from './RoundForm'

function NewGame() {

  const [round, setRound] = useState(0);

  return (
    <div>
      {round === 0 ? <GameForm setRound={setRound}/> : <RoundForm round={round}/>}
    </div>
  );
}

export default NewGame;
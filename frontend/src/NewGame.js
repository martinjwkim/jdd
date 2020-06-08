import React, { useState } from 'react';
import GameForm from './GameForm'
import RoundForm from './RoundForm'
import FinalScores from './FinalScores'
import './NewGame.css'

function NewGame() {

  const [round, setRound] = useState(0);
  const [players, setPlayers] = useState({});
  const [scores, setScores] = useState({});
  const [multiplier, setMultipler] = useState(0.1)
  const [finalRound, setFinalRound] = useState(10)
  const [endGame, setEndGame] = useState(false)

  return (
    <div className='NewGame'>
      {round === 0 &&
        <GameForm
          setRound={setRound}
          setPlayers={setPlayers} />}
      {round > 0 && round <= finalRound &&
        <RoundForm
          endGame={endGame}
          setRound={setRound}
          round={round}
          players={players}
          scores={scores}
          setScores={setScores}
          multiplier={multiplier} />}
      {round > finalRound &&
        <FinalScores
          players={players}
          scores={scores}
          round={round}
          multiplier={multiplier}
          setFinalRound={setFinalRound}
          setEndGame={setEndGame}
          endGame={endGame} />}
    </div>
  );
}

export default NewGame;
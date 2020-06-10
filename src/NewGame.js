import React, { useState } from 'react';
import RoundForm from './RoundForm'
import FinalScores from './FinalScores'
import './NewGame.css'

function NewGame({round, setRound, players}) {

  const [scores, setScores] = useState({});
  const [multiplier, setMultiplier] = useState(0.1)
  const [finalRound, setFinalRound] = useState(10)
  const [endGame, setEndGame] = useState(false)

  return (
    <div className='NewGame'>
      {round > 0 && round <= finalRound &&
        <RoundForm
          endGame={endGame}
          setRound={setRound}
          round={round}
          players={players}
          scores={scores}
          setScores={setScores}
          finalRound={finalRound}
          multiplier={multiplier} />}
      {round > finalRound &&
        <FinalScores
          players={players}
          scores={scores}
          setScores={setScores}
          round={round}
          multiplier={multiplier}
          finalRound={finalRound}
          setFinalRound={setFinalRound}
          setEndGame={setEndGame}
          endGame={endGame} />}
    </div>
  );
}

export default NewGame;
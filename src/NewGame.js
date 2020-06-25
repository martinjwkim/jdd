import React from 'react';
import RoundForm from './RoundForm'
import GameForm from './GameForm'
import FinalScores from './FinalScores'
import { useSelector } from "react-redux";
import './NewGame.css'

function NewGame() {

  const round = useSelector(store => store.round);
  const finalRound = useSelector(store => store.finalRound)

  return (
    <div className='NewGame'>
      {round <= finalRound && <RoundForm />}
      {round > finalRound && <FinalScores />}
    </div>
  );
}

export default NewGame;
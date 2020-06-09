import React, {useState} from 'react';
import ButtonsGroup from  './ButtonsGroup'
import EditForm from './EditForm'
import ScoresTable from './ScoresTable'
import ScoreCard from './ScoreCard'

function FinalScores({players, setScores, scores, round, multiplier, endGame, setEndGame, setFinalRound, finalRound}) {

  const [showEditForm, setShowEditForm] = useState(false)

  return (
    <div style={{display: 'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
      {!endGame && <ButtonsGroup setEndGame={setEndGame} setFinalRound={setFinalRound} setShowEditForm={setShowEditForm}/>}
      {showEditForm && <EditForm players={players} setScores={setScores} setShowEditForm={setShowEditForm} />}
      <ScoreCard players={players} scores={scores} multiplier={multiplier} round={round} endGame={endGame}/>
      <ScoresTable finalRound={finalRound} players={players} scores={scores} round={round}/>
    </div>
  );
}

export default FinalScores;
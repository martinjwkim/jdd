import React, {useState} from 'react';
import ButtonsGroup from  './ButtonsGroup'
import EditForm from './EditForm'
import ScoresTable from './ScoresTable'
import ScoreCard from './ScoreCard'

function FinalScores({players, scores, round, multiplier, endGame, setEndGame, setFinalRound}) {

  const [showEdit, setShowEdit] = useState(false)

  return (
    <div style={{display: 'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
      {!endGame && <ButtonsGroup setEndGame={setEndGame} setFinalRound={setFinalRound} setShowEdit={setShowEdit}/>}
      {showEdit && <EditForm />}
      <ScoreCard players={players} scores={scores} multiplier={multiplier} round={round} endGame={endGame}/>
      <ScoresTable players={players} scores={scores} round={round}/>
    </div>
  );
}

export default FinalScores;
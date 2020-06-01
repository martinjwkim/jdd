import React from 'react';
import ScoresTable from './ScoresTable'
import ScoreCard from './ScoreCard'

function FinalScores({players, scores, round, multiplier}) {

  return (
    <div style={{display: 'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
      <ScoreCard players={players} scores={scores} multiplier={multiplier} round={round}/>
      <ScoresTable players={players} scores={scores} round={round}/>
    </div>
  );
}

export default FinalScores;
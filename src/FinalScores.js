import React from 'react';
import ScoresTable from './ScoresTable'
import ScoreCard from './ScoreCard'


function FinalScores({players, scores, round, multiplier}) {

  return (
    <div>
      <ScoresTable players={players} scores={scores} round={round}/>
      <ScoreCard players={players} scores={scores} multiplier={multiplier}/>
    </div>
  );
}

export default FinalScores;
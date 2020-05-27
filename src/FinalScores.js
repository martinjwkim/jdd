import React, {useState} from 'react';
import ScoresTable from './ScoresTable'


function FinalScores({players, scores, round}) {

  return (
    <div>
      <ScoresTable players={players} scores={scores} round={round}/>
    </div>
  );
}

export default FinalScores;
import React, {useState, useEffect} from 'react';

function Scores() {

  const [scores, setScores] = useState([])

  useEffect(()=>{
    let jddScores = localStorage.getItem('jdd-scores')
    setScores(jddScores)
  },[setScores])

  return (
    <div>
      {scores}
    </div>
  );
}

export default Scores;
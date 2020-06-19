import React, {useState} from 'react';
import { useSelector } from "react-redux";
import ButtonsGroup from  './ButtonsGroup'
import EditForm from './EditForm'
import ScoresTable from './ScoresTable'
import ScoreCard from './ScoreCard'

function FinalScores() {

  const [showEditForm, setShowEditForm] = useState(false)
  const endGame = useSelector(store => store.endGame);

  return (
    <div style={{display: 'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
      {!endGame && <ButtonsGroup setShowEditForm={setShowEditForm}/>}
      {showEditForm && <EditForm setShowEditForm={setShowEditForm} />}
      <ScoreCard />
      <ScoresTable />
    </div>
  );
}

export default FinalScores;
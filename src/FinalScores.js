import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import ButtonsGroup from './ButtonsGroup'
import Button from '@material-ui/core/Button';
import EditForm from './EditForm'
import ScoresTable from './ScoresTable'
import ScoreCard from './ScoreCard'

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

function FinalScores() {

  const [showEditForm, setShowEditForm] = useState(false)
  const [playAgain, setPlayAgain] = useState(false)
  const endGame = useSelector(store => store.endGame);
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      {!endGame && <ButtonsGroup setShowEditForm={setShowEditForm} />}
      {showEditForm && <EditForm setShowEditForm={setShowEditForm} />}
      {playAgain &&
        <Button variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          onClick={() => dispatch({ type: "RESET_GAME"})}
        >
          Play Again
        </Button>}
      <ScoreCard setPlayAgain={setPlayAgain}/>
      <ScoresTable />
    </div>
  );
}

export default FinalScores;
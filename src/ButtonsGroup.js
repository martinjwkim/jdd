import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import { getCurrentDate } from './helpers'
import Api from "./Api";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

function ButtonsGroup({ setShowEditForm, moneyObj }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = useSelector(store => store.user);

  const handleSubmit = () => {

    async function handleEndGame() {
      dispatch({ type: "END_GAME" })
      let currentDate = getCurrentDate();
        let oldScores = [];
        if (localStorage.getItem('jdd-scores')) {
          oldScores = JSON.parse(localStorage.getItem('jdd-scores'));
        }
        localStorage.setItem('jdd-scores', JSON.stringify([...oldScores, { date: currentDate, ...moneyObj }]));
        try {
          console.log(moneyObj)
          await Api.saveGame({
            username: user.username,
            p1score: moneyObj.player1,
            p2score: moneyObj.player2,
            p3score: moneyObj.player3,
            p4score: moneyObj.player4,
          });
        } catch (errors) {
          console.log('error at saveGame api')
        }
    }

    handleEndGame()
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
      <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        onClick={()=>setShowEditForm(true)}
        endIcon={<EditIcon />}
      >
        Edit Round
        </Button>
      <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        onClick={() => dispatch({ type: "ADD_ROUNDS"})}
        endIcon={<AddIcon />}
      >
        Play 2 More
        </Button>
      <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        onClick={() => handleSubmit()}
        endIcon={<CheckIcon />}
      >
        Finish Game
        </Button>
    </div>
  );
}

export default ButtonsGroup;
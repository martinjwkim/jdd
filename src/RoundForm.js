import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function RoundForm({ setRound, round, players, scores, setScores}) {
  const classes = useStyles();
  const INITIAL_STATE = {player1: "", player2: "", player3: "", player4: ""};
  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setScores(oldScores => ({
      ...oldScores,
      [round]: formData
    }))
    setRound((round) => round + 1)
    setFormData(()=>INITIAL_STATE)
    console.log(scores);
  };

  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData(oldFormData => ({
      ...oldFormData,
      [name]: value
    }))
  };

  const showInputs = () => {
    return ['player1', 'player2', 'player3', 'player4'].map(key => (
      <TextField 
        id="standard-basic"
        key={key} 
        name={key} 
        label={`${players[key]} Cards Left`} 
        onChange={handleChange} 
        value={formData[key]}/>
    ))
  }


  return (
    <div>
      <Typography variant="h6" className={classes.title}>
        Round {round}
      </Typography>
      <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
        {showInputs()}
        <Button type='submit'>Submit</Button>
      </form>
    </div>
  );
}

export default RoundForm;
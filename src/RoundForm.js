import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import ScoresTable from './ScoresTable'


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

function RoundForm({ setRound, round, players, scores, setScores }) {
  const classes = useStyles();
  const INITIAL_STATE = { player1: "", player2: "", player3: "", player4: "" };
  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setScores(oldScores => ({
      ...oldScores,
      [round]: formData
    }))
    setFormData(() => INITIAL_STATE)
    setRound((round) => round + 1)
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
        type='number'
        id={key}
        key={key}
        name={key}
        size='medium'
        label={`${players[key]}`}
        onChange={handleChange}
        value={formData[key]} />
    ))
  }


  return (
    <div style={{display:'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Card className={classes.root} variant="outlined" style={{ width: '300px', marginTop: '10vh', marginRight: '10vw' }}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            Round {round}
          </Typography>
          <Typography variant="p" className={classes.title}>
            Enter remaining cards:
          </Typography>
          <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
            {showInputs()}
            <Button style={{marginTop: '20px'}} type='submit' variant='contained' color='primary'>Submit</Button>
          </form>
        </CardContent>
      </Card>
      <ScoresTable players={players} scores={scores} round={round} />
    </div>  
  );
}

export default RoundForm;
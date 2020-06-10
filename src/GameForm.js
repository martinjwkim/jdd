import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import './GameForm.css'

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  instructions: {
    flexGrow: 1,
  },
  root: {
    width: '300px',
    marginTop: '25vh',
  },
  button: {
    marginTop: '20px'
  }
}));

function GameForm({ setRound, setPlayers }) {
  const history = useHistory();
  const classes = useStyles();
  const INITIAL_STATE = { 'player1': 'Player 1', 'player2': 'Player 2', 'player3': 'Player 3', 'player4': 'Player 4' }
  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setPlayers(formData)
    setRound(1);
    history.push('/newgame')
  };

  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData(oldFormData => ({
      ...oldFormData,
      [name]: value
    }))
  };


  return (
    <div className='GameForm'>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography variant="h6" className={classes.instructions}>
            Enter player names:
        </Typography>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField id="standard-basic" name="player1" label="Player 1" onChange={handleChange} /><br />
            <TextField id="standard-basic" name="player2" label="Player 2" onChange={handleChange} /><br />
            <TextField id="standard-basic" name="player3" label="Player 3" onChange={handleChange} /><br />
            <TextField id="standard-basic" name="player4" label="Player 4" onChange={handleChange} /><br />
            <Button className={classes.button} type='submit' variant='contained' color='primary'>Submit</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default GameForm;
import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

function GameForm({setRound}) {
  const classes = useStyles();
  const INITIAL_STATE = {'player1':'Player 1','player2':'Player 2','player3':'Player 3','player4':'Player 4'}
  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    console.log(formData)
    setRound(1)
  };

  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData(oldFormData => ({
      ...oldFormData,
      [name]: value
    }))
  };


  return (
    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
      <TextField id="standard-basic" name="player1" label="Player 1" onChange={handleChange}/>
      <TextField id="standard-basic" name="player2" label="Player 2" onChange={handleChange}/>
      <TextField id="standard-basic" name="player3" label="Player 3" onChange={handleChange}/>
      <TextField id="standard-basic" name="player4" label="Player 4" onChange={handleChange}/>
      <Button type='submit'>Submit</Button>
    </form>
  );
}

export default GameForm;
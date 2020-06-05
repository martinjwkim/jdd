import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
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


function EditForm({ players, setScores, setShowEditForm }) {
  const classes = useStyles();
  const INITIAL_STATE = { round: "", player1: "", player2: "", player3: "", player4: "" };
  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setScores(oldScores => ({
      ...oldScores,
      [formData.round]: {
        player1: formData.player1, 
        player2: formData.player2, 
        player3: formData.player3, 
        player4: formData.player4
      }
    }))
    setShowEditForm(false)
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
    <Card className={classes.root} variant="outlined" style={{ width: '300px', marginTop: '5vh' }}>
      <CardContent>
        <Typography variant="h6" className={classes.title}>
          Edit Round
        </Typography>
        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <TextField
            id='round'
            name='round'
            size='medium'
            label='Round'
            onChange={handleChange}
            value={formData.round} />
          {showInputs()}
          <Button style={{ marginTop: '20px' }} type='submit' variant='contained' color='primary'>Submit</Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default EditForm
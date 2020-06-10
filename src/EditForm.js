import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  root: {
    flexGrow: 1,
    width: '300px',
    marginTop: '5vh',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  form: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    marginTop: '20px',
  }
}));


function EditForm({ setShowAlert, players, setScores, setShowEditForm, finalRound }) {
  const classes = useStyles();
  const INITIAL_STATE = { round: "", player1: "", player2: "", player3: "", player4: "" };
  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    let noErrors = true;
    for (let key in formData) {
      if (formData[key] === '' || +formData[key] > 13 || +formData[key] < 0) {
        noErrors = false;
      }
    }
    if (formData.round < 0 || formData.round > finalRound) {
      noErrors = false;
    }
    if (noErrors) {
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
    } else {
      setShowAlert(true)
      setTimeout(() => setShowAlert(false), 2000)
    }
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
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h6" className={classes.title}>
          Edit Round
          <IconButton onClick={() => setShowEditForm(false)}>
            <ClearIcon />
          </IconButton>
        </Typography>
        <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            id='round'
            name='round'
            size='medium'
            label='Round'
            onChange={handleChange}
            value={formData.round} />
          {showInputs()}
          <Button className={classes.button} type='submit' variant='contained' color='primary'>Submit</Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default EditForm
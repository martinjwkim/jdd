import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import EditForm from './EditForm'
import ScoreCard from './ScoreCard'
import ScoresTable from './ScoresTable'
import './RoundForm.css'

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  root: {
    flexGrow: 1,
    width: '300px',
    marginTop: '5vh'
  },
  form: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  button: {
    marginTop: '20px'
  }
}));

function RoundForm({ setRound, round, players, scores, setScores, multiplier }) {
  const classes = useStyles();
  const INITIAL_STATE = { player1: "", player2: "", player3: "", player4: "" };
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [showEditForm, setShowEditForm] = useState(false)

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
        key={`${round}-${key}`}
        name={key}
        size='medium'
        label={`${players[key]}`}
        onChange={handleChange}
        required = {true}
        autoFocus = {key === 'player1' ? true : false}
        value={formData[key]} />
    ))
  }

  const handleClick = () => {
    setShowEditForm(true)
  }


  return (
    <div className='RoundForm'>
      <div className='RoundForm-Left'>
        <ScoreCard players={players} scores={scores} multiplier={multiplier} columnNames={false} round={round}/>
        <div className='RoundForm-Card'>
          <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography variant="h6" className={classes.title}>
                Round {round}
                <IconButton onClick={handleClick}>
                  <EditIcon />
                </IconButton>
              </Typography>
              <Typography className={classes.title}>
                Enter remaining cards:
              </Typography>
              <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit}>
                {showInputs()}
                <Button className={classes.button} type='submit' variant='contained' color='primary'>Submit</Button>
              </form>
            </CardContent>
          </Card>
          {showEditForm && <EditForm players={players} setScores={setScores} setShowEditForm={setShowEditForm} />}
        </div>
      </div>
      <ScoresTable players={players} scores={scores} round={round} />
    </div>
  );
}

export default RoundForm;
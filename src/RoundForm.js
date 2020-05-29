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
        key={key}
        name={key}
        size='medium'
        label={`${players[key]}`}
        onChange={handleChange}
        value={formData[key]} />
    ))
  }

  const handleClick = () => {
    setShowEditForm(true)
  }


  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '3vw' }}>
        <ScoreCard players={players} scores={scores} multiplier={multiplier} columnNames={false} />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Card className={classes.root} variant="outlined" style={{ width: '300px', marginTop: '5vh' }}>
            <CardContent>
              <Typography variant="h6" className={classes.title}>
                Round {round}
                <IconButton onClick={handleClick}>
                  <EditIcon />
                </IconButton>
              </Typography>
              <Typography variant="p" className={classes.title}>
                Enter remaining cards:
              </Typography>
              <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                {showInputs()}
                <Button style={{ marginTop: '20px' }} type='submit' variant='contained' color='primary'>Submit</Button>
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
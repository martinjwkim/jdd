import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
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
import LaughingModal from './LaughingModal'
import redCard from './red-card.jpg'
import blueCard from './blue-card.jpg'
import './RoundForm.css'

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  root: {
    flexGrow: 1,
    width: '300px',
    position: 'relative'
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
  },
}));

function RoundForm({ setRound, round, players, scores, setScores, multiplier, endGame, finalRound }) {
  const classes = useStyles();
  const INITIAL_STATE = { player1: "", player2: "", player3: "", player4: "" };
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [showEditForm, setShowEditForm] = useState(false)
  const [openModal, setOpenModal] = useState(false);
  const [player, setPlayer] = useState('');
  const [showAlert, setShowAlert] = useState(false)

  const handleOpenModal = (player) => {
    setPlayer(player)
    setOpenModal(true)
    setTimeout(()=>{setOpenModal(false)},12000)
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    let noErrors = true;
    for (let key in formData){
      if (+formData[key]===13){
        handleOpenModal(key)
      }
      if (formData[key]==='' || +formData[key]>13 || +formData[key]<0){
        noErrors = false;
      }
    }
    if (noErrors){
      setScores(oldScores => ({
        ...oldScores,
        [round]: formData
      }))
      setFormData(() => INITIAL_STATE)
      setRound((round) => round + 1)
    } else {
      setShowAlert(true)
      setTimeout(()=>setShowAlert(false),2000)
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
        key={`${round}-${key}`}
        name={key}
        size='medium'
        label={`${players[key]}`}
        onChange={handleChange}
        autoFocus = {key === 'player1' ? true : false}
        value={formData[key]} />
    ))
  }

  return (
    <div className='RoundForm'>
      {/* {openModal && 
        <LaughingModal
          player={player}
          openModal={openModal} 
          setOpenModal={setOpenModal}/>} */}
      <div className='RoundForm-Left'>
        {showAlert && <Alert severity="error">Please enter a number between 0-13!</Alert>}
        <ScoreCard players={players} scores={scores} multiplier={multiplier} columnNames={false} round={round} endGame={endGame}/>
        <div className='RoundForm-Card'>
          <Card className={classes.root} variant="outlined">
            <img style={{position: 'absolute', left:0}} src={round%2===1 ? redCard : blueCard} width='300px' height='360px' alt='red-card'/>
            <CardContent>
              <Typography variant="h6" className={classes.title}>
                Round {round}
                <IconButton onClick={()=>setShowEditForm(true)}>
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
          {showEditForm && <EditForm setShowAlert={setShowAlert} finalRound={finalRound} players={players} setScores={setScores} setShowEditForm={setShowEditForm} />}
        </div>
      </div>
      <ScoresTable finalRound={finalRound} players={players} scores={scores} round={round} />
    </div>
  );
}

export default RoundForm;
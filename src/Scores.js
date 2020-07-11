import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { finalScoreColor } from './helpers'
import { v4 as uuid } from 'uuid';
import { useSelector } from 'react-redux'
import './Scores.css';
import Api from './Api';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function Scores() {

  const [scores, setScores] = useState([])
  const classes = useStyles();
  const players = useSelector(store=>store.players)
  const user = useSelector(store=>store.user)

  useEffect(() => {
    let jddScores = JSON.parse(localStorage.getItem('jdd-scores'))
    // setScores(jddScores)

    async function getScores () {
      let games;
      try {
        games = await Api.getGames(user.username)
        setScores(games)
      } catch (errors) {
        console.error('error at get games api')
      }
    }
    getScores()
  }, [setScores, user])

  const showScores = () => {
    return (
      <div>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                {Object.values(players).map(player => (
                  <TableCell align="center" key={player}>{player}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {scores.map((score) => (
                <TableRow key={uuid()}>
                  <TableCell component="th" scope="score">
                    {score.played_at.split('T')[0].slice(5)}
                  </TableCell>
                  {['p1score', 'p2score', 'p3score', 'p4score'].map(player => (
                    <TableCell key={player} style={{ background: finalScoreColor(score[player]) }} align="center">{`$${score[player]}`}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  }

  return (
    <div className='Scores'>
      {scores && showScores()}
    </div>
  );
}

export default Scores;
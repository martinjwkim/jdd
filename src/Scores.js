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
import './Scores.css';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function Scores() {

  const [scores, setScores] = useState([])
  const classes = useStyles();

  useEffect(() => {
    let jddScores = JSON.parse(localStorage.getItem('jdd-scores'))
    setScores(jddScores)
  }, [setScores])

  const showScores = () => {
    return (
      <div>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                {['Player 1', 'Player 2', 'Player 3', 'Player 4'].map(player => (
                  <TableCell align="center" key={player}>{player}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {scores.map((score) => (
                <TableRow key={uuid()}>
                  <TableCell component="th" scope="score">
                    {score.date}
                  </TableCell>
                  {['player1', 'player2', 'player3', 'player4'].map(player => (
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
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {scoreMultiplier, moneyCalc} from './helpers'


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


function ScoreCard({ players, scores, multiplier }) {
  const classes = useStyles();
  const [finalScores, setFinalScores] = useState({});
  const [moneyScores, setMoneyScores] = useState([0,0,0,0]);


  useEffect(() => {
    let player1 = 0;
    let player2 = 0;
    let player3 = 0;
    let player4 = 0;

    for (let round in scores) {
      player1 += +scoreMultiplier(scores[round].player1)
      player2 += +scoreMultiplier(scores[round].player2)
      player3 += +scoreMultiplier(scores[round].player3)
      player4 += +scoreMultiplier(scores[round].player4)
    }

    setFinalScores({ player1, player2, player3, player4 })
    setMoneyScores(moneyCalc([player1,player2,player3,player4]))

  }, [scores]);

  return (
    <div style={{ width: '50vw' }}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center"></TableCell>
              <TableCell align="center">{players.player1}</TableCell>
              <TableCell align="center">{players.player2}</TableCell>
              <TableCell align="center">{players.player3}</TableCell>
              <TableCell align="center">{players.player4}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">Total Score</TableCell>
              <TableCell align="center">{finalScores.player1}</TableCell>
              <TableCell align="center">{finalScores.player2}</TableCell>
              <TableCell align="center">{finalScores.player3}</TableCell>
              <TableCell align="center">{finalScores.player4}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">Money Owed</TableCell>
              <TableCell align="center">{(moneyScores[0]*multiplier).toFixed(2)}</TableCell>
              <TableCell align="center">{(moneyScores[1]*multiplier).toFixed(2)}</TableCell>
              <TableCell align="center">{(moneyScores[2]*multiplier).toFixed(2)}</TableCell>
              <TableCell align="center">{(moneyScores[3]*multiplier).toFixed(2)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ScoreCard;
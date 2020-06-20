import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useSelector } from "react-redux";
import { scoreMultiplier, moneyCalc, finalScoreColor, getCurrentDate } from './helpers'

const useStyles = makeStyles({
  table: {
    minWidth: 300,
  },
});


function ScoreCard({ columnNames = true }) {
  
  const classes = useStyles();
  const [finalScores, setFinalScores] = useState({});
  const [moneyScores, setMoneyScores] = useState([0, 0, 0, 0]);
  const players = useSelector(store => store.players);
  const round = useSelector(store => store.round);
  const multiplier = useSelector(store => store.multiplier);
  const endGame = useSelector(store => store.endGame);
  const scores = useSelector(store => store.scores)

  const addToDB = async () => {
    // await axios.post("/games", {
    //   username: username,
    //   p1score: 1,
    //   p2score: 2,
    //   p3score: 3,
    //   p4score: -10,
    // });
  }

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
    let moneyArr = moneyCalc([player1, player2, player3, player4], multiplier)
    let moneyObj = {player1: moneyArr[0], player2: moneyArr[1], player3: moneyArr[2], player4: moneyArr[3]}

    setMoneyScores(moneyArr)
    if (endGame) {
      let currentDate = getCurrentDate();
      addToDB()
      let oldScores = [];
      if (localStorage.getItem('jdd-scores')) {
        oldScores = JSON.parse(localStorage.getItem('jdd-scores'));
      }
      localStorage.setItem('jdd-scores', JSON.stringify([...oldScores, { date: currentDate, ...moneyObj }]));
    }

  }, [scores, multiplier, round, endGame]);

  return (
    <div style={{ width: '40vw', marginTop:'2vh' }}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columnNames && <TableCell style={{ fontSize: '24px' }} align="center"></TableCell>}
              <TableCell style={{ fontSize: '24px' }} align="center">{players.player1}</TableCell>
              <TableCell style={{ fontSize: '24px' }} align="center">{players.player2}</TableCell>
              <TableCell style={{ fontSize: '24px' }} align="center">{players.player3}</TableCell>
              <TableCell style={{ fontSize: '24px' }} align="center">{players.player4}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {columnNames && <TableCell style={{ fontSize: '24px' }} align="center" component="th" scope="row">Total Score</TableCell>}
              <TableCell style={{ fontSize: '24px' }} align="center">{finalScores.player1}</TableCell>
              <TableCell style={{ fontSize: '24px' }} align="center">{finalScores.player2}</TableCell>
              <TableCell style={{ fontSize: '24px' }} align="center">{finalScores.player3}</TableCell>
              <TableCell style={{ fontSize: '24px' }} align="center">{finalScores.player4}</TableCell>
            </TableRow>
            <TableRow>
              {columnNames && <TableCell style={{ fontSize: '24px' }} align="center" component="th" scope="row">Money Owed</TableCell>}
              <TableCell style={{ fontSize: '24px', background: finalScoreColor(moneyScores[0]) }} align="center">{`$${moneyScores[0]}`}</TableCell>
              <TableCell style={{ fontSize: '24px', background: finalScoreColor(moneyScores[1]) }} align="center">{`$${moneyScores[1]}`}</TableCell>
              <TableCell style={{ fontSize: '24px', background: finalScoreColor(moneyScores[2]) }} align="center">{`$${moneyScores[2]}`}</TableCell>
              <TableCell style={{ fontSize: '24px', background: finalScoreColor(moneyScores[3]) }} align="center">{`$${moneyScores[3]}`}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ScoreCard;
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import useWindowDimensions from "./useWindowDimensions";
import { useSelector } from "react-redux";
import { scoreMultiplier, moneyCalc, finalScoreColor, getCurrentDate } from './helpers'
import Api from "./Api";

const useStyles = makeStyles({
  table: {
    minWidth: 300,
  },
});

function ScoreCard({ columnNames = true, setPlayAgain }) {
  //refactor everything in here

  const classes = useStyles();
  const [finalScores, setFinalScores] = useState({});
  const [moneyScores, setMoneyScores] = useState([0, 0, 0, 0]);
  const user = useSelector(store => store.user);
  const players = useSelector(store => store.players);
  const round = useSelector(store => store.round);
  const multiplier = useSelector(store => store.multiplier);
  const endGame = useSelector(store => store.endGame);
  const scores = useSelector(store => store.scores)
  const fontSize = '2vw'

  useEffect(() => {
    async function handleEndGame() {
      let currentDate = getCurrentDate();
        let oldScores = [];
        if (localStorage.getItem('jdd-scores')) {
          oldScores = JSON.parse(localStorage.getItem('jdd-scores'));
        }
        localStorage.setItem('jdd-scores', JSON.stringify([...oldScores, { date: currentDate, ...moneyObj }]));
        try {
          await Api.saveGame({
            username: user.username,
            p1score: moneyObj.player1,
            p2score: moneyObj.player2,
            p3score: moneyObj.player3,
            p4score: moneyObj.player4,
          });
        } catch (errors) {
          console.log('error at saveGame api')
        }
        setPlayAgain(true)
    }

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
    let moneyObj = { player1: moneyArr[0], player2: moneyArr[1], player3: moneyArr[2], player4: moneyArr[3] }

    if (endGame) {
      handleEndGame()
    }
    setMoneyScores(moneyArr)

  }, [scores, multiplier, round, endGame, setPlayAgain, user]);

  return (
    <div style={{ width: '40vw', marginTop: '2vh' }}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columnNames && <TableCell style={{ fontSize: '24px' }} align="center"></TableCell>}
              {['player1','player2','player3','player4'].map((player)=><TableCell key={player} style={{ fontSize }} align="center">{players[player]}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {columnNames && <TableCell style={{ fontSize }} align="center" component="th" scope="row">Total Score</TableCell>}
              {['player1','player2','player3','player4'].map((player)=><TableCell key={player} style={{ fontSize }} align="center">{finalScores[player]}</TableCell>)}
            </TableRow>
            <TableRow>
              {columnNames && <TableCell style={{ fontSize }} align="center" component="th" scope="row">Money Owed</TableCell>}
              {[0,1,2,3].map((num)=><TableCell key={num} style={{ fontSize, background: finalScoreColor(moneyScores[num]) }} align="center">{`$${moneyScores[num]}`}</TableCell>)}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ScoreCard;

// [{"date":"06-5","player1":"0.10","player2":"-13.10","player3":"-2.30","player4":"15.30"},{"date":"06-6","player1":"5.50","player2":"-0.10","player3":"-12.10","player4":"6.70"},{"date":"06-8","player1":"29.00","player2":"-20.00","player3":"-13.00","player4":"4.00"},{"date":"06-10","player1":"13.00","player2":"-14.60","player3":"6.20","player4":"-4.60"},{"date":"06-11","player1":"6.70","player2":"2.70","player3":"1.90","player4":"-11.30"},{"date":"06-12","player1":"13.10","player2":"8.70","player3":"11.50","player4":"-33.30"},{"date":"06-15","player1":"-6.50","player2":"0.70","player3":"5.50","player4":"0.30"},{"date":"06-16","player1":"9.30","player2":"22.50","player3":"-24.30","player4":"-7.50"},{"date":"06-18","player1":"0.10","player2":"-8.30","player3":"-13.50","player4":"21.70"},{"date":"06-19","player1":"7.90","player2":"-16.50","player3":"-9.30","player4":"17.90"},{"date":"06-20","player1":"8.20","player2":"-17.40","player3":"19.00","player4":"-9.80"},{"date":"06-21","player1":"-6.10","player2":"9.10","player3":"13.90","player4":"-16.90"},{"date":"06-22","player1":"-2.30","player2":"2.10","player3":"10.50","player4":"-10.70"},{"date":"06-23","player1":"-2.90","player2":"-1.70","player3":"9.50","player4":"-4.90"},{"date":"06-25","player1":"-16.10","player2":"11.90","player3":"-3.70","player4":"7.90"},{"date":"06-26","player1":"-2.60","player2":"-7.80","player3":"13.00","player4":"-2.60"},{"date":"06-27","player1":"3.50","player2":"-19.70","player3":"-7.30","player4":"23.50"},{"date":"06-28","player1":"7.50","player2":"7.10","player3":"5.10","player4":"-19.70"},{"date":"06-30","player1":"16.50","player2":"-21.10","player3":"19.70","player4":"-15.10"},{"date":"07-2","player1":"-12.60","player2":"-1.80","player3":"11.40","player4":"3.00"},{"date":"07-3","player1":"19.70","player2":"-19.50","player3":"-3.50","player4":"3.30"},{"date":"07-4","player1":"16.00","player2":"-12.80","player3":"10.40","player4":"-13.60"},{"date":"07-5","player1":"3.50","player2":"9.10","player3":"-3.70","player4":"-8.90"},{"date":"07-6","player1":"12.80","player2":"12.00","player3":"-32.80","player4":"8.00"},{"date":"07-7","player1":"14.60","player2":"6.60","player3":"-16.60","player4":"-4.60"}]
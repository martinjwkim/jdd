import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

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
                <TableCell align="right">Player 1</TableCell>
                <TableCell align="right">Player 2</TableCell>
                <TableCell align="right">Player 3</TableCell>
                <TableCell align="right">Player 4</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {scores.map((score) => (
                <TableRow key={score.date}>
                  <TableCell component="th" scope="score">
                    {score.date}
                  </TableCell>
                  <TableCell align="right">{score.player1}</TableCell>
                  <TableCell align="right">{score.player2}</TableCell>
                  <TableCell align="right">{score.player3}</TableCell>
                  <TableCell align="right">{score.player4}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5vh' }}>
      {scores && showScores()}
    </div>
  );
}

export default Scores;
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {scoreMultiplier} from './helpers'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(round, player1, player2, player3, player4) {
  if (player1) {
    return {
      round,
      player1: `${player1} | ${scoreMultiplier(player1)}`,
      player2: `${player2} | ${scoreMultiplier(player2)}`,
      player3: `${player3} | ${scoreMultiplier(player3)}`,
      player4: `${player4} | ${scoreMultiplier(player4)}`
    };
  } else {
    return {
      round,
      player1,
      player2,
      player3,
      player4
    };
  }
}

export default function SimpleTable({ players, scores }) {
  const classes = useStyles();

  const rows =
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(round =>
      createData(
        round,
        scores[round]?.player1,
        scores[round]?.player2,
        scores[round]?.player3,
        scores[round]?.player4
      )
    )

  return (
    <div style={{ width: '50vw' }}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Round</TableCell>
              <TableCell align="center">{players.player1}</TableCell>
              <TableCell align="center">{players.player2}</TableCell>
              <TableCell align="center">{players.player3}</TableCell>
              <TableCell align="center">{players.player4}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.round}>
                <TableCell component="th" scope="row">
                  {row.round}
                </TableCell>
                <TableCell align="center">{row.player1}</TableCell>
                <TableCell align="center">{row.player2}</TableCell>
                <TableCell align="center">{row.player3}</TableCell>
                <TableCell align="center">{row.player4}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

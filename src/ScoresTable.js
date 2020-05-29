import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import { scoreMultiplier, bgColor } from './helpers'

const useStyles = makeStyles((theme) => ({

}));

function createData(round, player1, player2, player3, player4) {
  if (player1) {
    return {
      round,
      player1: { score: scoreMultiplier(player1), color: bgColor(player1) },
      player2: { score: scoreMultiplier(player2), color: bgColor(player2) },
      player3: { score: scoreMultiplier(player3), color: bgColor(player3) },
      player4: { score: scoreMultiplier(player4), color: bgColor(player4) }
    };
  } else {
    return {
      round,
      player1: { score: "", color: 'white' },
      player2: { score: "", color: 'white' },
      player3: { score: "", color: 'white' },
      player4: { score: "", color: 'white' }
    };
  }
}

function ScoresTable({ players, scores }) {
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
    <div style={{ width: '40vw', marginTop: '5vh' }}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow className={classes.tablecell}>
              <TableCell style={{ fontSize: '18px' }}>Round</TableCell>
              <TableCell style={{ fontSize: '18px' }} align="center">{players.player1}</TableCell>
              <TableCell style={{ fontSize: '18px' }} align="center">{players.player2}</TableCell>
              <TableCell style={{ fontSize: '18px' }} align="center">{players.player3}</TableCell>
              <TableCell style={{ fontSize: '18px' }} align="center">{players.player4}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.round}>
                <TableCell style={{ fontSize: '18px' }}>
                  {row.round}
                </TableCell>
                <TableCell style={{ fontSize: '18px', background: row.player1.color }} align="center">{row.player1.score}</TableCell>
                <TableCell style={{ fontSize: '18px', background: row.player2.color }} align="center">{row.player2.score}</TableCell>
                <TableCell style={{ fontSize: '18px', background: row.player3.color }} align="center">{row.player3.score}</TableCell>
                <TableCell style={{ fontSize: '18px', background: row.player4.color }} align="center">{row.player4.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ScoresTable;
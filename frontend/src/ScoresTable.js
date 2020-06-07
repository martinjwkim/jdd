import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { scoreMultiplier, bgColor } from './helpers'
import './ScoresTable.css'

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
    <div className='ScoresTable'>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Round</TableCell>
              {['player1','player2','player3','player4'].map(player=>(
                  <TableCell align="center">{players[player]}</TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.round}>
                <TableCell >
                  {row.round}
                </TableCell>
                {['player1','player2','player3','player4'].map(player=>(
                  <TableCell style={{ background: row[player].color }} align="center">{row[player].score}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ScoresTable;
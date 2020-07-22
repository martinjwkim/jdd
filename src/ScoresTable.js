import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useSelector } from "react-redux";
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

function ScoresTable() {

  const players = useSelector(store => store.players);
  const finalRound = useSelector(store => store.finalRound);
  const scores = useSelector(store => store.scores);

  const rows =
    [...Array(finalRound).keys()].map(x => x+1).map(round =>
      createData(
        round,
        scores[round]?.player1,
        scores[round]?.player2,
        scores[round]?.player3,
        scores[round]?.player4
      )
    )
  
  const icon = (score) => {
    console.log('score :', score)
    if (score > 40){
      return <i className="fas fa-skull-crossbones skull-icon"></i>
    } else if (score === '-10'){
      return <i className="fas fa-trophy"></i>
    } else {
      return score
    }
  }

  return (
    <div className='ScoresTable'>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align='center'>Round</TableCell>
              {['player1', 'player2', 'player3', 'player4'].map(player => (
                <TableCell align="center" key={player}>{players[player]}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.round}>
                <TableCell align="center">
                  {row.round}
                </TableCell>
                {['player1', 'player2', 'player3', 'player4'].map(player => (
                  <TableCell key={player} style={{ background: row[player].color }} align="center">{icon(row[player].score)}</TableCell>
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
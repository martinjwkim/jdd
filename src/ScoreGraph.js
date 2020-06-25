import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
// import { useSelector } from "react-redux";
import './ScoreGraph.css'

function ScoreGraph() {

  // const scores = useSelector(store => store.scores)
  const scores = JSON.parse(localStorage.getItem('jdd-scores'))
  console.log(scores);
  const data = scores.map(score=>({name: score.date, player1:score.player1, player2:score.player2, player3:score.player3, player4:score.player4, }))

  return (
    <div className='ScoreGraph'>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="player1" stroke="black" />
        <Line type="monotone" dataKey="player2" stroke="green" />
        <Line type="monotone" dataKey="player3" stroke="red" />
        <Line type="monotone" dataKey="player4" stroke="blue" />
      </LineChart>
    </div>
  );
}

export default ScoreGraph;
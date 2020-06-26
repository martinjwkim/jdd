import React, {useState, useEffect} from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';
import { useSelector } from "react-redux";
import './ScoreGraph.css'

function ScoreGraph() {

  // const scores = useSelector(store => store.scores)
  const scores = JSON.parse(localStorage.getItem('jdd-scores'))
  const players = useSelector(store => store.players)
  const data = scores.map(score=>({date: score.date, [players.player1]:score.player1, [players.player2]:score.player2, [players.player3]:score.player3, [players.player4]:score.player4, }))

  const [maxScore, setMaxScore] = useState(0)
  const [minScore, setMinScore] = useState(0)

  useEffect(()=>{
    let  scoresArr = [];
    for (let score of scores){
      for (let key in score){
        if ( key !== 'date'){
          scoresArr.push(+score[key])
        }
      }
    }
    setMaxScore(Math.max(...scoresArr))
    setMinScore(Math.min(...scoresArr))
  },[scores, setMaxScore, setMinScore])

  return (
    <div className='ScoreGraph'>
      <LineChart
        width={800}
        height={500}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date"/>
        <YAxis type="number" domain={[minScore,maxScore]}/>
        {console.log(maxScore, minScore)}
        <Tooltip />
        <Legend />
        <ReferenceLine y="0" stroke="black" strokeDasharray="3 3"/>
        <Line type="monotone" dataKey={players.player1} stroke="red" />
        <Line type="monotone" dataKey={players.player2} stroke="green" />
        <Line type="monotone" dataKey={players.player3} stroke="#FF00FF" />
        <Line type="monotone" dataKey={players.player4} stroke="blue" />
      </LineChart>
    </div>
  );
}

export default ScoreGraph;
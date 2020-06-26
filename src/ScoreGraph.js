import React, {useState, useEffect} from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';
import { useSelector } from "react-redux";
import './ScoreGraph.css'

function ScoreGraph({player1=null, player2=null, player3=null, player4=null}) {

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
          top: 5, right: 5, left: 5, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date"/>
        <YAxis type="number" domain={[minScore,maxScore]}/>
        {console.log(maxScore, minScore)}
        <Tooltip />
        <Legend />
        <ReferenceLine y="0" stroke="black" strokeDasharray="3 3"/>
        {player1 && <Line type="monotone" dataKey={players.player1} stroke="red" />}
        {player2 && <Line type="monotone" dataKey={players.player2} stroke="green" />}
        {player3 && <Line type="monotone" dataKey={players.player3} stroke="#FF00FF" />}
        {player4 && <Line type="monotone" dataKey={players.player4} stroke="blue" />}
      </LineChart>
    </div>
  );
}

export default ScoreGraph;
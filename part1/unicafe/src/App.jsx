import { useState } from 'react'


const calculateAverage=(good,bad,neutral)=>(good+bad+neutral!=0)?(good-bad)/(good+bad+neutral):0
const calculatePositive=(good,bad,neutral)=>(good+bad+neutral!=0)?good/(good+bad+neutral)*100:0


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text="give feedback"/>
      <Button name="good" onClick={()=>setGood(good+1)}/>
      <Button name="neutral" onClick={()=>setNeutral(neutral+1)}/>
      <Button name="bad" onClick={()=>setBad(bad+1)}/>
      <Header text="statistics"/>
      {(good+neutral+bad)!=0?<Statistics good={good} bad={bad} neutral={neutral}/>:<p>{"No feedback given"}</p>}



    </div>
  )
}

const Button=({name,onClick})=>(
  <button onClick={onClick}>{name}</button>
)
const Header=({text})=>(
  <h1>{text}</h1>
)

const StatisticLine=({text,value})=>(
  <tr>
  <td>{text}</td>
  <td>{value}</td>
  </tr>
)
const Statistics=({good,bad,neutral})=>(
  <table>
    <tbody>
  <StatisticLine text="good" value={good}/>
  <StatisticLine text="neutral" value={neutral}/>
  <StatisticLine text="bad" value={bad}/>
  <StatisticLine text="all" value={(bad+good+neutral)}/>
  <StatisticLine text="average" value={calculateAverage(good,bad,neutral)}/>
  <StatisticLine text="positive" value={calculatePositive(good,bad,neutral)+"%"}/>
    </tbody>
  </table>

)

export default App
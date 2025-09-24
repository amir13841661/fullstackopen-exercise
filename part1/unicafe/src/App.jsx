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
      <Statistics good={good} bad={bad} neutral={neutral}/>



    </div>
  )
}

const Button=({name,onClick})=>(
  <button onClick={onClick}>{name}</button>
)
const Header=({text})=>(
  <h1>{text}</h1>
)

const Content=({text})=>(
  <p>{text}</p>
)
const Statistics=({good,bad,neutral})=>(
  <>
  <Header text="statistics"/>
  <Content text={"good"+" "+ good}/>
  <Content text={"neutral"+" "+ neutral}/>
  <Content text={"bad"+" "+ bad}/>
  <Content text={"all"+" "+(bad+good+neutral)}/>
  <Content text={"average"+" "+calculateAverage(good,bad,neutral)}/>
  <Content text={"positive"+" "+calculatePositive(good,bad,neutral)+"%"}/>
  </>

)

export default App
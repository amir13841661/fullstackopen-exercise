import { useState } from 'react'




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
      <Content name="good" count={good}/>
      <Content name="neutral" count={neutral}/>
      <Content name="bad" count={bad}/>


    </div>
  )
}

const Button=({name,onClick})=>(
  <button onClick={onClick}>{name}</button>
)
const Header=({text})=>(
  <h1>{text}</h1>
)

const Content=({name, count})=>(
  <p>{name} {count}</p>
)

export default App
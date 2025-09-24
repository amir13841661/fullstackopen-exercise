import { useState } from 'react'




const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const setRandomAnecdote=()=>{
    let num=0
    while(true){
      num=Math.floor(Math.random()*anecdotes.length)
      if(selected!=num){
        break;
      }
    }
    return setSelected(num)

  }

  const handleVote=()=>{
    const temp=[...votes]
    temp[selected]+=1
    return setVotes(temp)
  }

  

   
  const [selected, setSelected] = useState(0)
  const [votes,setVotes]=useState(new Array(anecdotes.length).fill(0))
  // console.log(votes);
  
  const max=Math.max(...votes)
  // console.log(max);
  const maxIndex=votes.indexOf(max)

  return (
    
    <div>
      <Header text="Anecdote of the day"/>
      <Content text={anecdotes[selected]}/>
      <Content text={`has ${votes[selected]} votes`}/>
      <Button name="vote" onClick={handleVote}/>
      <Button name="next anecdote" onClick={setRandomAnecdote} />
      <Header text="Anecdote with most votes"/>
      <Content text={anecdotes[maxIndex]}/>
      <Content text={`has ${votes[maxIndex]} votes`}/>
    </div>
  )
}

const Button=({name,onClick})=>(
  <button onClick={onClick}>{name}</button>
)
const Content=({text})=>(
  <p>{text}</p>
)
const Header=({text})=>(
  <h1>{text}</h1>
)



export default App
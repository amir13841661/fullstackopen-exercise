import { useState } from 'react'
import Persons from './components/Persons'




const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',number:"040-1234567"}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber]=useState('')
  const addPerson=(event)=>{
    event.preventDefault()
    
    
    persons.find(u=>u.name==newName)?alert(`${newName} already exists`):setPersons(persons.concat({name:newName,number:newNumber}))
    setNewName("")
    setNewNumber("")
  }

  // console.log(newName);
  

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={(event)=>(setNewName(event.target.value))}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={(event)=>{setNewNumber(event.target.value)}}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={persons}/>
    </div>
  )
}

export default App
import { useState } from 'react'
import Persons from './components/Persons'
import PhoneForm from './components/PhoneForm'
import SearchForm from './components/SearchForm'
import { useEffect } from 'react'
import axios from 'axios'



const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber]=useState('')
  const [searchName,setSearchName]=useState('')

  useEffect(()=>{
    axios.get("http://localhost:3001/persons")
    .then(response=>{
      console.log(response.data);
      
      setPersons(response.data)
    })
  },[])

  const addPerson=(event)=>{
    event.preventDefault()
    
    
    persons.find(u=>u.name==newName)?alert(`${newName} already exists`):setPersons(persons.concat({name:newName,number:newNumber,id:persons.length+1}))
    setNewName("")
    setNewNumber("")
  }
  // console.log(searchName);
  // console.log(persons.filter((person)=>(
  //       person.name.toLowerCase().includes(searchName.toLowerCase())
  //     )));
  

  
  const filterPersons=()=>(
      searchName?persons.filter((person)=>(
        person.name.toLowerCase().includes(searchName.toLowerCase())
    )):persons

  )

  const handleSearchForm=(event)=> setSearchName(event.target.value)


  // console.log(newName);
  

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchForm onChange={handleSearchForm} value={searchName}/>

      <h2>add a new</h2>
      <PhoneForm onSubmit={addPerson} setNewName={setNewName} setNewNumber={setNewNumber} newName={newName} newNumber={newNumber}/>
      <h2>Numbers</h2>
      <Persons persons={filterPersons()}/>
    </div>
  )
}

export default App
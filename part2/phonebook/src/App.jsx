import { useState } from 'react'
import Persons from './components/Persons'
import PhoneForm from './components/PhoneForm'
import SearchForm from './components/SearchForm'
import { useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'



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
    personService.getAll()
    .then(data=>setPersons(data))
  },[])


  const addPerson=()=>{
    const newPerson={name:newName,number:newNumber,id:`${Number(persons[persons.length-1].id)+1}`}
    setPersons(persons.concat(newPerson))
    personService.create(newPerson)
  }

  const changeNumber=()=>{
    const index=persons.findIndex(u=>u.name==newName)
    const person=persons[index]
    person.number=newNumber
    personService.updatePerson(person)
    const copy=[...persons]
    copy.splice(index,1,person)
    setPersons(copy)
  }


  const handleAdd=(event)=>{
    event.preventDefault()
    
    
    persons.find(u=>u.name==newName)?changeNumber():addPerson()
    setNewName("")
    setNewNumber("")
  }

  const deletePerson=(person)=>()=>{
    console.log(person.id);
    
    const confirmation=window.confirm(`are you sure you want to remove ${person.name}`)
    if(confirmation){
      const index=persons.findIndex(u=>u.id==person.id)
      const id=person.id
      // console.log(id);
      personService.deletePerson(id)
      const copy=[...persons]
      copy.splice(index,1)
      setPersons(copy)


    }

    

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
      <PhoneForm onSubmit={handleAdd} setNewName={setNewName} setNewNumber={setNewNumber} newName={newName} newNumber={newNumber}/>
      <h2>Numbers</h2>
      <Persons persons={filterPersons()} handleDelete={deletePerson}/>
    </div>
  )
}

export default App
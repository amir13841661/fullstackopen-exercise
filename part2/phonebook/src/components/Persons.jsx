import Person from "./Person";

const Persons = ({persons,handleDelete})=>(
    <ul>
    {persons.map((person)=>(
        <Person person={person} id={person.id} key={person.id} handleDelete={handleDelete}/>
    ))}
    </ul>
)

export default Persons
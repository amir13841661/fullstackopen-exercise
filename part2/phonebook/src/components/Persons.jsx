import Person from "./Person";

const Persons = ({persons,handleDelete})=>(
    <ul>
    {persons.map((person,i)=>(
        <Person person={person} id={i} key={i} handleDelete={handleDelete}/>
    ))}
    </ul>
)

export default Persons
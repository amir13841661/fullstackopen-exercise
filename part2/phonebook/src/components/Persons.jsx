import Person from "./Person";

const Persons = ({persons})=>(
    <ul>
    {persons.map((person)=>(
        <Person person={person} id={person.id} key={person.id}/>
    ))}
    </ul>
)

export default Persons
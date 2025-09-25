import Person from "./Person";

const Persons = ({persons})=>(
    <ul>
    {persons.map((person,i)=>(
        <Person person={person} id={i} key={i}/>

    ))}
    </ul>
)

export default Persons
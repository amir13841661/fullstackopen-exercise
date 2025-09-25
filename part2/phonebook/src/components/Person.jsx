const Person=({person,id, handleDelete})=>(
    <li key={id}>{person.name}:{person.number}

    <button onClick={handleDelete(person)}>delete</button> 
    
    </li>
)

export default Person
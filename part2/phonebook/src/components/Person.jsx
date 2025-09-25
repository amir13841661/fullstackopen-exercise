const Person=({person,id})=>(
    <li key={id}>{person.name}:{person.number}</li>
)

export default Person
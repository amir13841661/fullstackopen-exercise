import Part from "./Part"

const Content=({parts})=>(
    <ul>
    {parts.map((part)=>(<Part  key={part.id} id={part.id} name={part.name} exercises={part.exercises}/>))}
    </ul>
)

export default Content
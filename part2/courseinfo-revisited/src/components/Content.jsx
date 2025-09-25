import Part from "./Part"
import Total from "../Total"

const Content=({parts})=>(
    <ul>
    {parts.map((part)=>(<Part key={part.id} name={part.name} exercises={part.exercises}/>))}
    </ul>
)

export default Content
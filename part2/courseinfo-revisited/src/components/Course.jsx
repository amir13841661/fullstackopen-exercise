import Content from "./Content";
import Header from "./Header";
import Total from "../Total";

const Course=({course})=>(
    <li key={course.id}>
    <Header text={course.name}/>
    <Content parts={course.parts}/>
    <Total parts={course.parts}/>

    </li>

)

export default Course
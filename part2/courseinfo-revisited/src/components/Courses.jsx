import Course from "./Course"

const Courses=({courses})=>(
    <ul>
        {courses.map(
            (course)=>(
                <Course course={course} key={course.id}/>
            )
        )}
    </ul>

)



export default Courses
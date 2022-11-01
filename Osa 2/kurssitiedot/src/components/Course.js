const Course = (props) => {
    return ( 
        <>
            <Header course={props.course.name} />
            <Content courses = {props.course} />
            <Total parts = {props.course.parts} />
        </>
    )
}

const Header = (props) => {
    return (
      <h1>{props.course}</h1>
    )
  }
  
  const Content = ({courses}) => {
    return (
      <ul>
        {courses.parts.map(part => 
        <Part key={part.id} name = {part.name} points={part.exercises}/>
        )}
      </ul>
    )
  }
  
  const Total = ({parts}) => {
    let totalExercises = 0
    for (let part of parts) {
      totalExercises += part.exercises
    }
    return (
      <p>Number of exercises: {totalExercises}</p>
    )
  }
  
  const Part = ({name, points}) => {
    return (
      <li>{name}: {points}</li>
    )
  }

  export default Course
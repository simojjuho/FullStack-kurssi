const Course = ({course}) => {
  return (
    <>
      <Header course={course.name} />
      <Content courses={course} />
      <Total parts={course.parts} />
    </>
  )
}

const Header = (props) => {
  return (
    <h2>{props.course}</h2>
  )
}

const Content = ({ courses }) => {
  return (
    <ul>
      {courses.parts.map(part =>
        <Part key={part.id} name={part.name} points={part.exercises} />
      )}
    </ul>
  )
}

const Total = ({ parts }) => {
  let initialValue = 0
  const total = parts.reduce((total, current) => total + current.exercises, initialValue)
  return (
    <p style={{fontWeight: 'bold'}}>Number of exercises: {total}</p>
  )
}

const Part = ({ name, points }) => {
  return (
    <li>{name}: {points}</li>
  )
}

export default Course
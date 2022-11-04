const Numbers = ({numbers}) => {

    return (
    <>
        <div>
        {numbers.map(person =>
        <Person key={person.id} person={person.name} number={person.number} />
        )}
        </div>
    </>
)}

export default Numbers

const Person = ({person, number}) => {
    return <p>{person}: {number}</p>
  }
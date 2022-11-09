const ShowNumbers = ({numbers, removeContact}) => {

    return (
    <>
        <div>
        {numbers.map(person => 
        <Person key={person.id} person={person.name} number={person.number} id={person.id} removeContact={removeContact}/>)}
        </div>
    </>
)}

export default ShowNumbers

const Person = ({person, number, id, removeContact}) => {
    const clickHandler = () => removeContact(id, person)

    return (
        <p>
            {person}: {number} <br />
            { <button onClick={() => clickHandler()}>delete contact</button> }
        </p>
    )
  }
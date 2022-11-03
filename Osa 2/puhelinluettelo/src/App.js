import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      id: 1 }
  ]) 
  const [newName, setNewName] = useState('')

  const addContact = (event) => {
    event.preventDefault()
    const contactObject = {
      id: persons.length + 1,
      name: newName
    }
    if (persons.some(element => element.name === newName)) {
      alreadyAdded(contactObject.name)
    } else {
      setPersons(persons.concat(contactObject))
      setNewName('')
    }
  }

  const handleNameFieldChange = (event) => {
    setNewName(event.target.value)
  }

  const alreadyAdded = (person) => alert(`${person} already added to the contact list!`)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addContact}>
        <div>
          name: <input 
                  value={newName}
                  onChange={handleNameFieldChange} 
                />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person =>
      <Person key={person.id} person={person.name}/>
      )}
    </div>
  )

}

export default App

const Person = ({person}) => {
  return <p>{person}</p>
}
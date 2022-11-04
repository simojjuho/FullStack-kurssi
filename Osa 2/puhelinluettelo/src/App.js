import { useState } from 'react'
import Numbers from './components/Numbers'
import AddNumber from './components/AddNumber'

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas', number: '040-123456' },
    { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
    { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
    { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addContact = (event) => {
    event.preventDefault()
    const contactObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber
    }
    if (persons.some(element => element.name === newName)) {
      alreadyAdded(contactObject.name)
    } else {
      setPersons(persons.concat(contactObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameFieldChange = (event) => setNewName(event.target.value)
  
  const handleNumberFieldChange = (event) => setNewNumber(event.target.value)

  const alreadyAdded = (person) => alert(`${person} already added to the contact list!`)

  return (
    <div>
      <h2>Phonebook</h2>
      <AddNumber 
        handleNameFieldChange = {handleNameFieldChange} 
        handleNumberFieldChange = {handleNumberFieldChange} 
        addContact={addContact}
        newName = {newName}
        newNumber={newNumber}/>
      <div>
        <Numbers numbers={persons}/>
      </div>
    </div>
      
  )

}

export default App

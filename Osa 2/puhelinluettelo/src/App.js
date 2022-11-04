import { useState } from 'react'
import Numbers from './components/Numbers'
import AddNumber from './components/AddNumber'
import NumberFilter from './components/NumberFilter'

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas', number: '040-123456' },
    { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
    { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
    { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterField, setNumberFilter] = useState('')

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

  const handleFilterFieldChange = (event) => setNumberFilter(event.target.value)

  function filterNameList() {
    let contactsIn
    return persons.filter(contact => contact.name.toLocaleLowerCase().includes(filterField.toLowerCase()))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <h3>Add a contact</h3>
      <AddNumber
        handleNameFieldChange={handleNameFieldChange}
        handleNumberFieldChange={handleNumberFieldChange}
        addContact={addContact}
        newName={newName}
        newNumber={newNumber} />
      <div>
        <h3>Filter contacts</h3>
        <NumberFilter filterField={filterField} handleFilterFieldChange={handleFilterFieldChange} />
        <h3>Numbers</h3>

        <Numbers numbers={filterNameList()} />
      </div>
    </div>

  )

}

export default App

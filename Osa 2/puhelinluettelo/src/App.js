import { useEffect, useState } from 'react'
import Numbers from './components/Numbers'
import AddNumber from './components/AddNumber'
import NumberFilter from './components/NumberFilter'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterField, setNumberFilter] = useState('')

  useEffect(()=> {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  },[])
 
  const addContact = event => {
    event.preventDefault()
    const contactObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(element => element.name === newName)) {
      alreadyAdded(contactObject.name)
    } else {
      axios
        .post('http://localhost:3001/persons', contactObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleNameFieldChange = (event) => setNewName(event.target.value)

  const handleNumberFieldChange = (event) => setNewNumber(event.target.value)

  const alreadyAdded = (person) => alert(`${person} already added to the contact list!`)

  const handleFilterFieldChange = (event) => setNumberFilter(event.target.value)

  const filterNameList = () => persons.filter(contact => contact.name.toLocaleLowerCase().includes(filterField.toLowerCase()));

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

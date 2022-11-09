import { useEffect, useState } from 'react'
import ShowNumbers from './components/ShowNumbers'
import AddNumber from './components/AddNumber'
import NumberFilter from './components/NumberFilter'
import numbersService from './services/numbers'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterField, setNumberFilter] = useState('')

  useEffect(()=> {
    numbersService.getAll()
      .then(returnedNumbers => setPersons(returnedNumbers.data))
  },[])
 
  //Lisätään kontaksti. Jos lisättävä nimi on jo olemassa, kutsutaan updateContact() -funktiota.
  const addContact = event => {
    event.preventDefault()
    const contactObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(element => element.name === newName)) {
      updateContact(persons.find(person => person.name === contactObject.name), contactObject)
    } else {
      numbersService.createContact(contactObject)
        .then(returnedNumbers => {
          setPersons(persons.concat(returnedNumbers))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const removeContact = (id, name) => {
    if(window.confirm(`Haluatko varmasti poistaa ${id}: ${name} yhteystiedoista?`)){    
      numbersService.deleteContact(id)  
        .then(() => {
          window.alert(`Yhteystieto ${id}: ${name} on poistettu`)
          setPersons(persons.filter(person => person.id !== id))})
        .catch(error => {
          console.log('Yhteystietoa ei löytynyt palvelimelta')
          setPersons(persons.filter(person => person.id !== id))
        })
        
      }    
  }



  const updateContact = (person, newContact) => {
    if(window.confirm(`Haluatko varmasti päivittää yhteystiedon?`)) {
      numbersService.update(person.id, newContact)
        .then(returnedNumber => {
          console.log(returnedNumber)
          setPersons(persons.map(contact => contact.id !== person.id ? contact : returnedNumber))
          console.log(`Yhteystiedo ID:llä ${person.id} on päivitetty.`)
        })
    }
  }

  //Käsittelee namefield-kentän muutoksen
  const handleNameFieldChange = (event) => setNewName(event.target.value)

  //Käsittelee numberfield-kentän muutoksen
  const handleNumberFieldChange = (event) => setNewNumber(event.target.value)

  //Jos numero on jo lisätty, näytetään hälytys.
  const alreadyAdded = (person) => alert(`${person} already added to the contact list!`)

  //Suodatin-kentän käsittely
  const handleFilterFieldChange = (event) => setNumberFilter(event.target.value)

  //Palauttaa taulukon, jossa on vain suodatetut yhteystiedot.
  const filterNameList = () => persons.filter(contact => contact.name.toLowerCase().includes(filterField.toLowerCase()))

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

        <ShowNumbers numbers={filterNameList()} removeContact={removeContact} />
      </div>
    </div>

  )

}

export default App

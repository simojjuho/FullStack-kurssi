import { useEffect, useState } from 'react'
import ShowNumbers from './components/ShowNumbers'
import AddNumber from './components/AddNumber'
import NumberFilter from './components/NumberFilter'
import numbersService from './services/numbers'
import Feedback from './components/Feedback'
import Error from './components/Error'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterField, setNumberFilter] = useState('')
  const [feedBackMessage, setFeedbackMessage] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(()=> {
    numbersService.getAll()
      .then(returnedNumbers => {
        setPersons(returnedNumbers.data)
        nullFeedbackMessage()
      })
      .catch(error => {
        setErrorMsg(`Yhteystietojen noutaminen palvelimelta ei onnistunut!`)
        nullErrorMsg()
      })
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
          setFeedbackMessage(`Yhteystieto ${contactObject.name}: ${contactObject.number} lisättiin onnistuneesti palvelimelle!`)
          nullFeedbackMessage()
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setErrorMsg(`Yhteystiedon ${contactObject.name}: ${contactObject.number} lisääminen palvelimelle ei onnistunut.`)
          nullErrorMsg()
        })
    }
  }

  const removeContact = (id, name) => {
    if(window.confirm(`Haluatko varmasti poistaa ${id}: ${name} yhteystiedoista?`)){    
      numbersService.deleteContact(id)  
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setFeedbackMessage(`Yhteystieto ${id}: ${name} on poistettu`)
          nullFeedbackMessage()
        })
        .catch(error => {
          console.log('Yhteystietoa ei löytynyt palvelimelta')
          setErrorMsg(`Yhteystietoa ei löytynyt palvelimelta`)
          nullErrorMsg()
          setPersons(persons.filter(person => person.id !== id))
        })
        
      }    
  }



  const updateContact = (person, newContact) => {
    if(window.confirm(`Haluatko varmasti päivittää yhteystiedon?`)) {
      numbersService.update(person.id, newContact)
        .then(returnedNumber => {
          setPersons(persons.map(contact => contact.id !== person.id ? contact : returnedNumber))
          setFeedbackMessage(`Yhteystiedo ID:llä ${person.id} on päivitetty.`)
          nullFeedbackMessage()
        })
        .catch(error =>{
          setErrorMsg(`Yhteystiedon päivitys ei onnistunut!`)
          nullErrorMsg()
        })
    }
  }

  //Viiveen jälkeen viestikenttä poistetaan
  const nullFeedbackMessage = () => setTimeout(() => setFeedbackMessage(null), 5000)


  const nullErrorMsg = () => setTimeout(() => setErrorMsg(null), 5000)


  //Käsittelee namefield-kentän muutoksen
  const handleNameFieldChange = (event) => setNewName(event.target.value)

  //Käsittelee numberfield-kentän muutoksen
  const handleNumberFieldChange = (event) => setNewNumber(event.target.value)

  //Suodatin-kentän käsittely
  const handleFilterFieldChange = (event) => setNumberFilter(event.target.value)

  //Palauttaa taulukon, jossa on vain suodatetut yhteystiedot.
  const filterNameList = () => persons.filter(contact => contact.name.toLowerCase().includes(filterField.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Feedback feedback={feedBackMessage}/>
      <Error errorMsg={errorMsg}/>
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

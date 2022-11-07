import {useState, useEffect} from 'react';
import axios from 'axios'
import ShowCountries from './components/ShowCountries'
import Input from './components/Input';
import ShowCountryInfo from './components/ShowCountry';

function App() {

  const [inputText, setInputText] = useState('')
  const [countryData, setCountryData] = useState([])

  const handleInputTextChange = event => setInputText(event.target.value)

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => setCountryData(response.data))
  },[])

  const filterCountries = () => countryData.filter(country => country.name.common.toLowerCase().includes(inputText.toLowerCase()))

  return (
    <div>
      <Input inputText={inputText} handleInputTextChange={handleInputTextChange}/>
      {(filterCountries().length > 10)  ? <p>Too many countries, specify more!</p>
      : filterCountries().length > 1    ? <ShowCountries countries={filterCountries()} />
      : filterCountries().length == 1   ? <ShowCountryInfo country={filterCountries()[0]}/>
      : <p>No countries to show!</p>}
    </div>

  );
}

export default App;


 
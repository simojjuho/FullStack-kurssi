const ShowCountries = ({countries}) => {
    return (
        <ul>
            {countries.map(country => <ShowCountry key={country.ccn3} country={country} />)}
        </ul>
    )
  }

  export default ShowCountries
  
const ShowCountry = ({country}) => {
    return (
        <li>
            {country.name.common}
        </li>
    )}
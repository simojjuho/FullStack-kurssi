const ShowCountries = ({countries}) => {
    return (
        <ul>
            {countries.map(country => <ShowCountryName key={country.ccn3} country={country} />)}
        </ul>
    )
  }

  export default ShowCountries
  
const ShowCountryName = ({country}) => {
    return (
        <li>
            {country.name.common}
        </li>
    )}
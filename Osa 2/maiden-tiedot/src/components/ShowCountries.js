const ShowCountries = ({countries, handleShowCountryButton}) => {
    return (
        <ul>
            {countries.map(country => <ShowCountryName key={country.ccn3} country={country} handleShowCountryButton={handleShowCountryButton} />)}
        </ul>
    )
  }

  export default ShowCountries

const ShowCountryName = ({country, handleShowCountryButton}) => {
    return (
        <li>
            {country.name.common}
            <Button country={country} handleShowCountryButton={handleShowCountryButton}/>
        </li>
    )}
    
const Button = ({country, handleShowCountryButton}) => {
return (
    <><button onClick={() => handleShowCountryButton(country)}>show</button></>
)
}
  
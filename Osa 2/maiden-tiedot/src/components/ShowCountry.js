const ShowCountryInfo = ({country}) => {
    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>Capital: {}</p>
            <p>Area: {country.area}</p>
            <h4>Languages</h4>
            <ul>
            {Object.values(country.languages).map(language => <Language key={language} language={language}/>)}                
            </ul>
            <Flag country={country} />
            <WeatherIn capital = {country.capital[0]} />
        </div>
    )
}

export default ShowCountryInfo

const Language = ({language}) => <li >{language}</li>

const Flag = ({country}) => <><img src={country.flags.png} /></>

const WeatherIn = () => {
    
}
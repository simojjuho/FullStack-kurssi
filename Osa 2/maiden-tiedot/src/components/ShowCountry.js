const ShowCountryInfo = ({country}) => {
    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>Capital: {}</p>
            <p>Area: {country.area}</p>
            <h4>Languages</h4>
            <ul>
            {Object.values(country.languages).map(language => <Language language={language}/>)}                
            </ul>
            <Flag country={country} />
        </div>
    )
}

export default ShowCountryInfo

const Language = ({language}) => <li key={language.key}>{language}</li>

const Flag = ({country}) => <><img src={country.flags.png} /></>
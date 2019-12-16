import React from 'react'
import Weather from './Weather'


const CountryDetail = ({ country }) => {
  const languageRows = () => country.languages.map(language => <li key={language.name}>{language.name}</li>)

  return (
    <div>
      <h2>{country.name}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h3>Languages</h3>
      <ul>
        {languageRows()}
      </ul>
      <img src={country.flag} width='100px' alt='flag'></img>
      <Weather countryName={country.name}/>
    </div>
  )
}

export default CountryDetail

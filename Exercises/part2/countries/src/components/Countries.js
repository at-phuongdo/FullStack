import React from 'react'

const Countries = ({ countryToShow }) => {
  console.log(countryToShow);
  
  let countryLength = countryToShow.length
  if (countryLength > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else if (countryLength == 1) {
    let country = countryToShow[0]
    return (
      <div>
        <h2>{country.name}</h2>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
      </div>
    )
  } else if (countryLength >0 && countryLength <= 10) {
    const rows = () => countryToShow.map(country => <li key={country.name}>{country.name}</li>)
    return (
      <ul>
        {rows()}
      </ul>
    )
  } else {
    return (
      <div></div>
    )
  }
}

export default Countries

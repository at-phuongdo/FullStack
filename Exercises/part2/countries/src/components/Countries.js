import React from 'react'
import CountryDetail from './CountryDetail'

const Countries = ({ countryToShow, handleClickShow }) => {
  let countryLength = countryToShow.length
  if (countryLength > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else if (countryLength === 1) {
    return (
      <CountryDetail country={countryToShow[0]}/>
    )
  } else if (countryLength > 0 && countryLength <= 10) {
    const rows = () => countryToShow.map(country => <li key={country.name}>{country.name} <button onClick={handleClickShow(country.callingCodes)}>Show</button></li>)
    return (
      <ul>
        {rows()}
      </ul>
    )
  } else {
    return (
      <div>No matches, please specify another filter</div>
    )
  }
}

export default Countries

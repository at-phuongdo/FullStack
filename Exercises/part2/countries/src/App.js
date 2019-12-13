import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'

const App = () => {
  const [countries, setContries] = useState([])
  const [searchWord, setSearchWord] = useState('')

  useEffect(() => {
    const eventHandler = response => {
      setContries(response.data)
    }

    const promise = axios.get('https://restcountries.eu/rest/v2/all')
    promise.then(eventHandler)
  }, [])

  const handleSearchWorldChange = (event) => {
    setSearchWord(event.target.value)
  }

  const countryToShow = countries.filter(country => country.name.toLowerCase().includes(searchWord.toLowerCase()))

  return (
    <div>
      <h2>Countries</h2>
      Find country <input value={searchWord} onChange={handleSearchWorldChange}/>
      <Countries countryToShow={countryToShow} />
    </div>
  )
}

export default App

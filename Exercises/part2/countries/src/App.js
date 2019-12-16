import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchWord, setSearchWord] = useState('')

  useEffect(() => {
    let uri = !searchWord ? 'all' : `name/${searchWord}`

    axios.get(`https://restcountries.eu/rest/v2/${uri}`)
    .then(response => {
      setCountries(response.data)
    })
    .catch(error => {
      setCountries([])
    })
  }, [searchWord])

  const handleSearchWorldChange = (event) => {
    setSearchWord(event.target.value)
  }

  const onClickShow = (item) => () => {
    const promise = axios.get(`https://restcountries.eu/rest/v2/callingcode/${item[0]}`)
    promise.then(response => {
      setSearchWord(response.data[0].name)
    })
  }

  return (
    <div>
      <h2>Countries</h2>
      <Filter searchWord={searchWord} onSearchWordChange={handleSearchWorldChange}/>
      <p>{countries.length}</p>
      <Countries countryToShow={countries} handleClickShow={onClickShow} />
    </div>
  )
}

export default App

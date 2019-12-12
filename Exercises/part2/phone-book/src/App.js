import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchWord, setSearchWord] = useState('')

  const addPhone = (event) => {
    event.preventDefault()
    const newObject = {
      name: newName,
      number: newNumber
    }

    if (persons.map(person => person.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else if (newName !== '' && newNumber !== '') {
      setPersons(persons.concat(newObject))
    } else {
      alert('Please input')
    }

    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchWorldChange = (event) => {
    setSearchWord(event.target.value)
  }

  const personToShow = persons.filter(person => person.name.toLowerCase().includes(searchWord.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchWord={searchWord} onSearchWordChange={handleSearchWorldChange} />
      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        onAddPhone={addPhone}
      />
      <h2>Numbers</h2>
      <Person personToShow={personToShow} />
    </div>
  )
}

export default App

import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import personService from './services/person'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchWord, setSearchWord] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPerson => {
        setPersons(initialPerson)
      })
  }, [])

  const addPhone = (event) => {
    event.preventDefault()
    const newObject = {
      name: newName,
      number: newNumber
    }
    
    const existedPerson = persons.find(person => person.name === newName)
    
    if (!!existedPerson) {
      const isUpdate = window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`)
      
      if (isUpdate) {
        personService
        .update(existedPerson.id, newObject)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== existedPerson.id ? person : returnedPerson))
        })
      }
    } else if (newName !== '' && newNumber !== '') {
      personService
        .create(newObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
        })
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

  const handleDeletePerson = (name, id) => () => {
    const isDelete = window.confirm(`Delete ${name}?`)
    if (isDelete) {
      personService
      .deletePerson(id)
      .then(returnedPerson => {
        setPersons(persons.filter(person => person.id !== id ))
        setNewName('')
      })
    }
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
      <Person personToShow={personToShow} onClickDeletePerson={handleDeletePerson} />
    </div>
  )
}

export default App

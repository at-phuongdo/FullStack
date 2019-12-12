import React from 'react'

const Person = ({personToShow}) => {
  const rows = () => personToShow.map(person => <li key={person.name}>{person.name} {person.number}</li>)

  return (
    <ul>
      {rows()}
    </ul>
  )
}

export default Person

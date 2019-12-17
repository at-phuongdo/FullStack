import React from 'react'

const Person = ({personToShow, onClickDeletePerson}) => {
  const rows = () =>
  personToShow.map(person =>
    <li key={person.name}>{person.name} {person.number}
      <button onClick={onClickDeletePerson(person.name, person.id)}>Delete</button>
    </li>
  )

  return (
    <ul>
      {rows()}
    </ul>
  )
}

export default Person

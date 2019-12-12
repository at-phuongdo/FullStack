import React from 'react'

const PersonForm = ({newName, newNumber, onNameChange, onNumberChange, onAddPhone}) => {
  return (
    <form onSubmit={onAddPhone}>
      <div>
        <div>Name: <input value={newName} onChange={onNameChange} /></div>
        <div>Number: <input value={newNumber} onChange={onNumberChange} /></div>
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  )
}

export default PersonForm

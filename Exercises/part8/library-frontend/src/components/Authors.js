import React, { useState } from 'react'
import Select from 'react-select'

const Authors = ({ show, result, editBirthYear}) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)

  if (!show) {
    return null
  }
  
  if (result.loading) {
    return <div>loading ... </div>
  }

  const editBorn = async (e) => {
    e.preventDefault()
    await editBirthYear({
      variables: { name: name, setBornTo: born }
    })

    setName('')
    setBorn(0)
  }

  const options = result.data.allAuthors.map((author) => {
    return {
       label: author.name,
       value: author.name
    }
  })

  const handleChange = (selected) => {
    setSelectedOption(selected)
    setName(selected.value)
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {result.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={editBorn}>
        <Select
          value={selectedOption}
          onChange={handleChange}
          options={options}
        />
        <div>
          born <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>
 
        <button type='submit'>Update author</button>
      </form>
    </div>
  )
}

export default Authors

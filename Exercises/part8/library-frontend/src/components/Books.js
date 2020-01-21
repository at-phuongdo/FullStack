import React, { useState } from 'react'

const Books = ({ show, result }) => {
  const [ filter, setFilter ] = useState('all')

  if (!show) {
    return null
  }
  
  if (result.loading) {
    return <div>loading ... </div>
  }

  let genres_array = result.data.allBooks.map(book => book.genres).flat()
  const genres_uniq = [...new Set(genres_array)]
  const allBooks = result.data.allBooks
  const booksToShow = filter === 'all'
    ? allBooks
    : allBooks.filter(book => book.genres.includes(filter))

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {booksToShow.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {genres_uniq.map(genre =>
        <button key={genre} onClick={() => setFilter(genre)}>{genre}</button>
      )}
      <button onClick={() => setFilter('all')}>All genres</button>
    </div>
  )
}

export default Books
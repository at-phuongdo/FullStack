import React from 'react'

const Books = ({ show, books, favoriteGenre }) => {
  if (!show) {
    return null
  }
  
  if (books.loading) {
    return <div>loading ... </div>
  }

  const  userFavoriteGenre = favoriteGenre.data.me.favoriteGenre
  const booksToShow = books.data.allBooks.filter(book => book.genres.includes(userFavoriteGenre))

  return (
    <div>
      <h2>Recomendations</h2>
      <p>books in your favorite genre {userFavoriteGenre}</p>
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
    </div>
  )
}
export default Books
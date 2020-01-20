import React, { useState, useEffect } from 'react'
import { gql } from 'apollo-boost'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks'
import LoginForm from './components/LoginForm'

const ALL_AUTHORS = gql`
{
  allAuthors {
    name
    born
    bookCount 
  }
}
`

const ALL_BOOKS = gql`
{
  allBooks {
    title
    published
    author {
      name
    }
  }
}
`
const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title
    author {
      name
      born
    }
    published
    genres
  }
}
`

const EDIT_BIRTH_YEAR = gql`
mutation editBirthYear($name: String!, $setBornTo: Int!) {
  editAuthor(
    name: $name,
    setBornTo: $setBornTo
  ) {
    name
    born
  }
}
`
const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)

  const [errorMessage, setErrorMessage] = useState(null)
  const handleError = (error) => {
    setErrorMessage(error.graphQLErrors[0].message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const client = useApolloClient()

  const [addBook] = useMutation(CREATE_BOOK, {
    onError: handleError,
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]
  })

  const [editBirthYear] = useMutation(EDIT_BIRTH_YEAR, {
    onError: handleError,
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]
  })

  const [login] = useMutation(LOGIN, {
    onError: handleError
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const handleLoginForm = (token) => {
    setToken(token)
    setPage('authors')
  }

  const errorNotification = () => errorMessage &&
  <div style={{ color: 'red' }}>
    {errorMessage}
  </div>

  return (
    <div>
      {errorNotification()}
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token &&
          <button onClick={() => setPage('login')}>login</button>
        }
        {token &&
          <div>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={logout}>logout</button>
          </div>
        } 
      </div>

      <Authors
        show={page === 'authors'}
        result={authors}
        editBirthYear = {editBirthYear}
      />

      <Books
        show={page === 'books'}
        result={books}
      />

      <NewBook
        show={page === 'add'}
        addBook={addBook}
      />

      { !token && <LoginForm
        show={page === 'login'}
        login={login}
        setToken={(token) => handleLoginForm(token)}
      />}

    </div>
  )
}

export default App

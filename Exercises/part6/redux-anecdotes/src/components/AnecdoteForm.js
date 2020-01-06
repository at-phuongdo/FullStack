import React from 'react';
import { create } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
  const createAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.content.value
    props.store.dispatch(create(content))
    event.target.content.value = ''
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div><input name='content' /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm

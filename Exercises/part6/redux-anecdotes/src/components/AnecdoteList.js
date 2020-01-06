import React from 'react';
import { addVote } from '../reducers/anecdoteReducer'
import { votedMessage, clearMessage } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const { anecdotes, filter} = props.store.getState()

  const vote = (anecdote) => {
    props.store.dispatch(addVote(anecdote.id))
    props.store.dispatch(votedMessage(anecdote.content))
    setTimeout(() => {
      props.store.dispatch(clearMessage())
    }, 5000)
  }

  const anecdoteToShow = anecdotes.filter(anecdote => anecdote.content.includes(filter))
  return (
    <div>
      {anecdoteToShow.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList

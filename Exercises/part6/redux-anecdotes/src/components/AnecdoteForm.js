import React from 'react';
import { create } from '../reducers/anecdoteReducer'
import { createdMessage, clearMessage } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {
  const createAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.content.value
    props.create(content)
    event.target.content.value = ''
    props.createdMessage(content)
    setTimeout(() => {
      props.clearMessage()
    }, 5000)
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

const mapDispatchToProps = dispatch => {
  return {
    create: content => {
      dispatch(create(content))
    },
    createdMessage: content => {
      dispatch(createdMessage(content))
    },
    clearMessage: () => {
      dispatch(clearMessage())
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)

import React from 'react';
import { create } from '../reducers/anecdoteReducer'
import { setNotifcation } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {
  const createAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    props.create(content)
    props.setNotifcation(`you created '${content}'`, 5000)
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
    setNotifcation: (message, time) => {
      dispatch(setNotifcation(message, time))
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)

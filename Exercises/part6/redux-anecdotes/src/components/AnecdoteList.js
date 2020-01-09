import React from 'react';
import { addVote } from '../reducers/anecdoteReducer'
import { setNotifcation } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {
  const vote = (anecdote) => {
    props.addVote(anecdote)
    props.setNotifcation(`you voted '${anecdote.content}'`, 5000)
  }

  return (
    <div>
      {props.anecdotesToShow.map(anecdote =>
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

const anecdotesToShow = ({anecdotes, filter}) => {
  return anecdotes.filter(anecdote => anecdote.content.includes(filter))
}

const mapStateToProps = state => {
  return {
    anecdotesToShow: anecdotesToShow(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addVote: id => {
      dispatch(addVote(id))
    },
    setNotifcation: (message, time) => {
      dispatch(setNotifcation(message, time))
    }
  }

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

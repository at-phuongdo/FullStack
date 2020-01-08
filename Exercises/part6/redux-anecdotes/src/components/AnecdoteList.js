import React from 'react';
import { addVote } from '../reducers/anecdoteReducer'
import { votedMessage, clearMessage } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {
  const vote = (anecdote) => {
    props.addVote(anecdote.id)
    props.votedMessage(anecdote.content)
    setTimeout(() => {
      props.clearMessage()
    }, 5000)
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
    votedMessage: content => {
      dispatch(votedMessage(content))
    },
    clearMessage: () => {
      dispatch(clearMessage())
    }
  }

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

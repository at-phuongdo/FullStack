import anecdoteService from '../services/anecdotes'

export const addVote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = {...anecdote, votes: anecdote.votes + 1}
    const anecdoteUpdated = await anecdoteService.addVote(newAnecdote.id, newAnecdote)
    dispatch({
      type: 'VOTE',
      data: anecdoteUpdated
    })
  }
}

export const create = content => {
  return async dispatch => {
    const anecdotes = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: anecdotes
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'VOTE':
      const id = action.data.id
      const votedAnecdote = action.data
      return state.map(anecdote => anecdote.id !== id ? anecdote : votedAnecdote)
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export default reducer

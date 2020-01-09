const notificationReducer = (state = '', action) => {
  switch(action.type) {
    case 'SET_NOTIFICATION':
      return [...state, action.data.content]
    case 'CLEAR_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export const setNotifcation = (content, time) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        content,
        time
      }
    })
    setTimeout(() => { dispatch({type: 'CLEAR_NOTIFICATION'}) } , time)
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

export default notificationReducer

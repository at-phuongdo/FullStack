const notificationReducer = (state = '', action) => {
  switch(action.type) {
    case 'VOTED':
      return `You voted '${action.content}'`
    case 'CREATED':
      return `You created '${action.content}'`
    case 'CLEARED':
      return ''
    default:
      return state
  }
}

export const votedMessage = (content) => {
  return {
    type: 'VOTED',
    content
  }
}

export const createdMessage = (content) => {
  return {
    type: 'CREATED',
    content
  }
}

export const clearMessage = () => {
  return {
    type: 'CLEARED'
  }
}

export default notificationReducer

const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  const stateChanged = {...state}
  switch (action.type) {
    case 'GOOD':
      stateChanged.good = stateChanged.good + 1
      return stateChanged
    case 'OK':
      stateChanged.ok = stateChanged.ok + 1
      return stateChanged
    case 'BAD':
      stateChanged.bad = stateChanged.bad + 1
      return stateChanged
    case 'ZERO':
      return initialState
    default:
      return state
  }

}

export default counterReducer

# a.Flux-architecture and Redux
## 1. Flux-architecture
## 2. Redux
Create a new create-react-app-application and install redux with the command
```
npm install redux --save
```
```
import { createStore } from 'redux'

const counterReducer = (state = 0, action) => {
  // ...
}

const store = createStore(counterReducer)

store.dispatch({type: 'INCREASE'})
```

- A reducer is a function which is given the current state and an action as parameters. It returns a new state.

- `dispatch` are dispatched or 'sent' to the store with its dispatch-method

## 3. Pure functions, immutable
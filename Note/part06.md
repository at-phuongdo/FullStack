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
### Reducer
- push => make array changed
- concat => create new array, contains all the elements of the old array and the new element.

### Deep-freeze
- We'll also add the library deep-freeze, which can be used to ensure that the reducer has been correctly defined as a immutable function.
```
npm install --save-dev deep-freeze
```
The deepFreeze(state) command ensures that the reducer does NOT change the state of the store given to it as a parameter.

### Uncontroled form
Để viết một uncontrolled component khá đơn giản là bạn sẽ ko viết các event bắt sự kiện thay đổi input trong form mà bạn sẽ sử dụng một tham chiếu trực tiếp đến DOM.(có thể dùng ref)

```
addNote = (event) => {
  event.preventDefault()
  const content = event.target.note.value
  store.dispatch({
    type: 'NEW_NOTE',
    data: {
      content,
      important: false,
      id: generateId()
    }
  })
  event.target.note.value = ''
}

...


<form onSubmit={addNote}>
  <input name="note" /> 
  <button type="submit">add</button>
</form>
```

We can get the content of the new note straight from the form field. Because the field has a name, we can access the content via the event object event.target.note.value.

### Action Creator
Functions that create actions are called action creators.(addNote())

### Passing the state using props

# b.More reducer and connect

```
npm install --save react-redux
```
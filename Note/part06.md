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
## Connect

```
npm install --save react-redux
```

`Provider` là một component của react được cung cấp bởi thư viện react-redux. Nó dùng cho 1 mục đích duy nhất đó là **cung cấp store cho những component con của nó**

```
connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options]) 
```

`Điều quan trọng là chỉ có những component nằm bên trong Providers mới có thể connect`

**Hàm mapStateToProps là một bộ lọc (filter) sử dụng để lấy (select) những thứ trong cái thùng chứa mà component yêu cầu. Những thứ được select trở thành properties của component. Nhưng mapStateToProps() thôi là chưa đủ, bởi vì hàm này chỉ lấy được những thứ được yêu cầu trong thùng chứa mà không biết được thùng chứa đó nằm ở đâu. connect() sẽ làm điều còn thiếu, hàm này biết vị trí của thùng chứa và truyền (pass) nó vào hàm mapStateToProps. Vì vậy, component có thể lấy được chính xác những gì nó cần.**

# c. Communication with server
## 1. Redux-thunk
- Redux Thunk là một Middleware cho phép bạn viết các Action trả về một function thay vì một plain javascript object bằng cách trì hoãn việc đưa action đến reducer.
- Redux Thunk được sử dụng để xử lý các logic bất đồng bộ phức tạp cần truy cập đến Store hoặc đơn giản là việc lấy dữ liệu như Ajax request.

```
npm install --save redux-thunk
```

store.js

```
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer,
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store
```
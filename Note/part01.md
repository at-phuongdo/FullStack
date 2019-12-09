
1. JSX
2. Component
Component name must be Capitalized
3. Multiple Component

```
const Hello = () => { 
    return (
        <div>
            <p>Hello world</p>
        </div>
    )}
const App = () => {
  return (
    <div>
      <h1>Greetings</h1>
      <Hello />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

We have defined a new component Hello and used it inside the component App. Naturally, a component can be used multiple times:

```
const App = () => {
  return (
    <div>
      <h1>Greetings</h1>
      <Hello />
      <Hello />
      <Hello />
    </div>
  )
}
```
4. Props
props = {
  name: 'Arto Hellas',
  age: 35,
}

const { name, age } = props #name = 'Arto Hellas', age = 35
5. useState
const [counter, setCounter] = useState(0)
=> counter = 0, setCounter(): function update `counter` value
6. `Event handlers` must ALWAYS be a function or a reference to a function

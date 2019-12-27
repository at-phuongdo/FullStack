# a. Rendering a collection, modules
## 1. console.log
```
console.log('props value is' + props) #props value is [Object object]
console.log('props value is', props) #props value is ...
```
## 2. Key-attribute
 The list items, i.e. the elements generated by the map method, must each have a unique key value: an attribute called `key`.

## 3. Map
const result = notes.map(note => note.id)

## 4.Anti-pattern: array indexes as keys
The indexes can be retrieved by passing a second parameter to the map-method:
```
const rows = () => notes.map((note, i) => 
  <li key={i}>
    {note.content}
  </li>
)
```
# b. Form
## 1.
There is no default action that occurs on an input change, unlike on a form submission.
=> we need to call the `event.preventDefault()` with onSubmit
=> we don't need to call the `event.preventDefault()` with onChange
# c. Getting data from server
The code does not execute synchronously "from top to bottom", but does so `asynchronously`.
JavaScript calls the event handler that was registered for the request at some point.
## 1. Run json server

```
npm install axios --save
npm install json-server --save-dev
```
In package.json
```
  // ... 
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject",
    "server": "json-server -p3001 db.json"
  }
}
```
## 2. useEffect(function, array)
`useEffect` run after rendering or when something affects your component.
The array clearly tells react that just call useEffect when fields in me has been changed( If we don't give the second array,
useEffect has been called everytime the component changed.)
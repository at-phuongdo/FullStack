import React from 'react';
import logo from './logo.svg';
import './App.css';

const Hello = (props) => {
  return (
    <div>
      <p>Hello world {props.name}</p>
    </div>
  )
}

const Footer = () => {
  return (
    <div>
      Created by ...
    </div>
  )
}

const App = () => {
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name='Phuong' />
      <Hello name='Abc' />
      <Footer />
    </div>
  )
}

export default App;

import React from 'react'
import Header from './Header'
import Content from './Content'

const Courses = ({name, parts}) => {
  const total = parts.reduce((a,b) => a + b.exercises, 0)

  return (
    <div>
      <Header course={name}/>
      <Content parts={parts}/>
      <p><strong>Number of exercises {total}</strong></p>
    </div>
  )
}

export default Courses

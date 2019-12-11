import React from 'react';
import Course from './components/Course'

const App = ({courses}) => {
  return (
    <div>
      {courses.map((course) => <Course key={course.id} name={course.name} parts={course.parts} />)}
    </div>
  )
}

export default App

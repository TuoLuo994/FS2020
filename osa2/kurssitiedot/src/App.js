import React from 'react'
import Course from './components/course'


const App = ({courses}) => {

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course =>
        <div key={course.id}>
          <Course course={course} />
        </div>
      )}
    </div>
  )
}

export default App
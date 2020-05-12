import React from 'react'

const Course = ({course}) => {
  return(
    <div>
      <Header course={course.name} />
      <Content parts = {course.parts} />
      <Total course={course} />
    </div>
  )
}
const Header = (props) => {
  return(
    <h2>{props.course}</h2>
  )
}

const Content = (props) => {
  const parts = props.parts
  return(
    <div>
      {parts.map(p => 
        <Part key={p.id} part={p.name} ex={p.exercises} />
      )}
    </div>
  )
}

const Part = (props) => {
  return(
    <p>
      {props.part} {props.ex}
    </p>
  )
}

const Total = ({course}) => {
  const parts = course.parts
  const exs = parts.map(part => part.exercises)
  const total = exs.reduce( (s, p) => s + p)
  return(
    <p>
      <b>Total of {total} exercises</b>
    </p>
  )
}

export default Course
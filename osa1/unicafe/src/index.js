import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Display = ({ text, value }) => (
  <div>
    {text} {value}
  </div>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => { setGood(good + 1) }
  const addNeutral = () => { setNeutral(neutral + 1) }
  const addBad = () => { setBad(bad + 1) }
  
  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={addGood} text="good" />
      <Button onClick={addNeutral} text="neutral" />
      <Button onClick={addBad} text="bad" />
      <h2>statistics</h2>
      <Display text = 'good' value = {good} />
      <Display text = 'neutral' value = {neutral} />
      <Display text = 'bad' value = {bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
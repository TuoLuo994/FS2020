import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)


const getSum = (p1,p2,p3) => p1+p2+p3
const getAvg = (p1,p2,p3) => {
  if(p1+p2+p3 === 0){
    return 0
  }
  return (p1-p2)/(p1+p2+p3)
}
const getPos = (good, others) => {
  if (good+others === 0){
    return '0 %'
  }
  return ((good/(good+others))*100).toString().concat(' %')
}

const Statistics = (props) => {
  if (props.a === 0){
    return(
      <div>No feedback given</div>
    )
  }
  return(
  <table>
  <tbody>
    <StaticLine text='good' stat={props.g}/>
    <StaticLine text='neutral' stat={props.n}/>
    <StaticLine text='bad' stat={props.b}/>
    <StaticLine text='all' stat={props.a}/>
    <StaticLine text='average' stat={props.avg}/>
    <StaticLine text='positive' stat={props.p}/>
  </tbody>
  </table>
)}

const StaticLine = ({text, stat}) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{stat}</td>
    </tr>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const all = getSum(good, neutral, bad)
  const avg = getAvg(good, bad, neutral)
  const pos = getPos(good, bad+neutral)
  
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
      <Statistics g = {good} n = {neutral} b = {bad} 
      a = {all} avg = {avg} p = {pos}/>

    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
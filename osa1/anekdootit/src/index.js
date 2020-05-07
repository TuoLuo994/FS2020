import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)
const VoteCount = (props) => {
  return(
    <div>has {props.points} votes</div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const len = props.anecdotes.length

  const randomize = () => { setSelected(Math.floor(Math.random() * len) )}

  const points = new Array(len+1).join('0').split('').map(parseFloat)
  const [votes, setVotes] = useState(points)

  const [max, setMax] = useState(0)

  const givePoint = () => { 
    var copy = votes.slice()
    copy[selected] += 1
    setVotes(copy)
    if (copy[selected] > copy[max]){
      setMax(selected)
    }
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>
        {props.anecdotes[selected]}
      </div>
      <VoteCount points = {votes[selected]} />
      <Button text='vote' onClick={givePoint}/>
      <Button text='next anecdote' onClick={randomize}/>
      <h1>Anecdote with most votes</h1>
      <div>
        {props.anecdotes[max]}
        <VoteCount points = {votes[max]} />
      </div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
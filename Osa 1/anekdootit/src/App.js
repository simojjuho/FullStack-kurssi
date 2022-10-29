import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))

  //Asettaa satunnaisesti valitun anekdootin näkyville
  const setNewAnecdote = () => {
    setSelected(Math.floor(Math.random()*7))
  }

  //Lisää yhden äänen näytettävälle anekdootille
  const vote = () => {
    let copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  //Palauttaa eniten ääniä keränneen anekdootin
  const anecdoteWithMaxVotes = () => anecdotes[mostVotesIndex()]

  //Palauttaa indeksin eniten ääniä keränneeseen anekdoottiin
  const mostVotesIndex = () => {
    let copy = points
    let max = Math.max(...copy)
    return copy.indexOf(max)
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <DisplayAnecdote anecdote={anecdotes[selected]} /><br />
      <DisplayVotes selected = {selected} points={points} /><br />
      <Button handleClick={setNewAnecdote} text='Next anecdote!' />
      <Button handleClick={vote} text='Vote' />
      <h2>Anecdote with most votes</h2>
      <DisplayAnecdote anecdote={anecdoteWithMaxVotes()} /><br />
      <DisplayVotes selected = {mostVotesIndex()} points={points} />
    
    </div>
  )
  }

export default App

//Painikkeen renderöivä komponentti
const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

//Komponentti renderöitävälle anekdootille
const DisplayAnecdote = ({anecdote}) => 
  <>{anecdote}</>

//Komponentti renderöimään anekdoottien määrän
const DisplayVotes = ({selected, points}) =>
  <>has {points[selected]} points</>
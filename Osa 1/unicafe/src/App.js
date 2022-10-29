import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const giveGoodFeedback = () => setGood(good + 1)
  const giveNeutralFeedback = () => setNeutral(neutral + 1)
  const giveBadFeedback = () => setBad(bad + 1)
  
  return (
    <div>
      <H2 headingText='give feedback' />
      <Button handleClick={giveGoodFeedback} buttonText = 'good' />
      <Button handleClick={giveNeutralFeedback} buttonText = 'neutral' />
      <Button handleClick={giveBadFeedback} buttonText = 'bad' />
      <H2 headingText='statistics' />    
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App

const H2 = ({headingText}) => <h2>{headingText}</h2>

const Button = ({handleClick, buttonText}) =>
    <button onClick={handleClick}>{buttonText}</button>

const Statistics = ({good, neutral, bad}) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return <p>No feedback given</p>
}

  let all = good + neutral + bad
  let positiveRatio = good / (good + neutral + bad)
  let countAverage = (good - bad)/(good + neutral + bad)
 
  return (
    <table>
      <tbody>
        <StatisticLine statsText='Good' statsValue={good} />
        <StatisticLine statsText='Neutral' statsValue={neutral} />
        <StatisticLine statsText='Bad' statsValue={bad} />
        <StatisticLine statsText='All' statsValue={all} />
        <StatisticLine statsText='Average' statsValue={countAverage} />
        <StatisticLine statsText='Positive' statsValue={positiveRatio} />
      </tbody>
    </table>
  )
}

const StatisticLine = ({statsText, statsValue}) => <tr><td>{statsText}:</td><td>{statsValue}</td></tr>
